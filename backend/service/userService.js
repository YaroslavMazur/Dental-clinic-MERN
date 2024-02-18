const UserModel = require("../models/userModel");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDTO = require("../dtos/userDTO");

const bcrypt = require("bcrypt");

const uuid = require("uuid");
const ApiErrors = require("../exceptions/apiErrors");
const userModel = require("../models/userModel");



class userService {

    async registration(email, password, phoneNumber, fullName) {
        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiErrors.BadRequest("Registration error", [{ path: "email", msg: "user with such email already exist" }]);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();

        const user = await UserModel.create({ fullName, email, password: passwordHash, phoneNumber, activationLink });

        // await mailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };


    }

    async activate(activationLink) {

        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiErrors.BadRequest("Activation error", [{ path: "activationLink", msg: "Invalid activation link" }]);
        }

        user.isActivated = true;
        user.save();

    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiErrors.LoginError();
        }


        const isRightPassword = await bcrypt.compare(password, user.password);

        if (!isRightPassword) {
            throw ApiErrors.LoginError()
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };

    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        try {

            if (!refreshToken) {
                throw ApiErrors.UnauthorizedError();
            }

            const userData = tokenService.verifyRefreshToken(refreshToken);
            const tokenFromDB = tokenService.findToken(refreshToken);

            if (!userData || !tokenFromDB) {
                throw ApiErrors.UnauthorizedError();
            }

            const user = await userModel.findById(userData.id);
            const userDTO = new UserDTO(user);
            const tokens = tokenService.generateTokens({ ...userDTO });

            if (tokenFromDB.googleRefreshToken) {
                await tokenService.saveToken(userDTO.id, tokens.refreshToken, tokenFromDB.googleRefreshToken);
            } else {
                await tokenService.saveToken(userDTO.id, tokens.refreshToken);
            }
            return { ...tokens, user: userDTO };
        }
        catch (err) {
            console.log("refresh err", err);
        }


    }

    async getAllUsers() {
        const users = await userModel.find({}, { password: 0 });
        return users;
    }

    async getUserData(paramId, loggedId) {

        if (paramId !== loggedId) {
            throw ApiErrors.AccessDenied();
        }

        const user = await userModel.findOne({ _id: paramId }, { password: 0 });

        return user;
    }

    async findOrCreateUserFromGoogle(data, googleRefreshToken) {

        const user = await userModel.findOne({ email: data.email });

        if (!user) {

            const newPassword = uuid.v4();

            const userData = await this.registration( data.email, newPassword, null, data.name )
            return userData;
        }

        const userDTO = new UserDTO(user);
        const serverTokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, serverTokens.refreshToken, googleRefreshToken);

        return { ...serverTokens, user: userDTO };

    }

    async getAllDoctors(){
        const doctors = await userModel.find({role:"doctor"});
        // додати перевірку чи є в googleRefreshToken

        const doctorsData = doctors.map((doctor)=>{
            return doctor = new UserDTO(doctor);
        })

        return doctorsData;
    }

}

module.exports = new userService();

