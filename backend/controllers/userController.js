const ApiErrors = require("../exceptions/apiErrors");
const userService = require("../service/userService");
const {validationResult} = require("express-validator");



class userController{
    async registration(req, res, next){
        try{

            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return next(ApiErrors.BadRequest("Помилка при реєстрації", errors));
            }

            const {fullName, email, password, phoneNumber} = req.body;

            const userData = await userService.registration(email, password, phoneNumber, fullName);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true});
            
            return res.json(userData);

        }
        catch(err){

            next(err);
        }
    }

    async login(req, res, next){
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true});
            
            return res.json(userData);


        }
        catch(err){
            next(err);

        }
    }

    async logout(req, res, next){
        try{

            const {refreshToken} = req.cookies;

            const token = await userService.logout(refreshToken);
            res.clearCookie();

            return res.status(200).json(token);


        }
        catch(err){
                
        }
    }


    async activate(req, res, next){
        try{
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            
            return res.redirect(process.env.CLIENT_URL);
        }
        catch(err){
            next(err);
        }
    }

    async refresh(req, res, next){
        try{

        }
        catch(err){
            next(err);

        }
    }

    async getUsers(req, res, next){
        try{
            res.json({
                msg:"getUser"
            })
        }
        catch(err){
            next(err);

        }
    }
}

module.exports = new userController();