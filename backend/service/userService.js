const UserModel = require("../models/userModel");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDTO = require("../dtos/userDTO");

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const ApiErrors = require("../exceptions/apiErrors");
const userModel = require("../models/userModel");



class userService{

    async registration(email, password, phoneNumber, fullName){
        const candidate = await UserModel.findOne({ email });
        
        if(candidate){
            throw ApiErrors.BadRequest("User with such email already exist");
        }


        const passwordHash = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();

        const user = await UserModel.create({fullName, email, password:passwordHash, phoneNumber, activationLink});

        // await mailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO});

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return{...tokens, user: userDTO};


    }

    async activate(activationLink){

        const user = await UserModel.findOne({activationLink});
        if(!user){
            throw new Error("неправильне посилання для активації");
        }

        user.isActivated = true;
        user.save();

    }

    async login(email, password){
        const user = await UserModel.findOne({email});
        if(!user){
            throw ApiErrors.BadRequest("користувача з таким email не знайдено");
        }

        const isRightPassword = bcrypt.compare(password, user.password);

        if(!isRightPassword){
            throw ApiErrors.BadRequest("Неправильний email або пароль")
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO});

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return{...tokens, user: userDTO};




    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiErrors.UnauthorizedError();
        }

        const userData = tokenService.verifyRefreshToken();
        const tokenFromDB = tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB){
            throw ApiErrors.UnauthorizedError();
        }

        const user = await userModel.findById(userData.id);
        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO});

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return{...tokens, user: userDTO};


    }

    async getAllUsers(){
        const users = await userModel.find({}, {password:0});
        return users;
    }

}

module.exports = new userService();

