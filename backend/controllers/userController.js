const userService = require("../service/userService");

class userController{
    async registration(req, res, next){
        try{

            const {fullName, email, password, phoneNumber} = req.body;

            const userData = await userService.registration(email, password, phoneNumber, fullName);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true});
            
            return res.json(userData);

        }
        catch(err){
            console.log(err);
        }
    }

    async login(req, res, next){
        try{

        }
        catch(err){

        }
    }

    async logout(req, res, next){
        try{

        }
        catch(err){

        }
    }


    async activate(req, res, next){
        try{

        }
        catch(err){

        }
    }

    async refresh(req, res, next){
        try{

        }
        catch(err){

        }
    }

    async getUsers(req, res, next){
        try{
            res.json({
                msg:"getUser"
            })
        }
        catch(err){

        }
    }
}

module.exports = new userController();