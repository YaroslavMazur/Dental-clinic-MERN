require("dotenv").config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const ApiErrors = require("../exceptions/apiErrors");
const userService = require("../service/userService");
const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const mailService = require("../service/mailService");

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL
);


class userController {
    async registration(req, res, next) {
        try {

            const { fullName, email, password, phoneNumber } = req.body;

            const userData = await userService.registration(email, password, phoneNumber, fullName);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);

        }
        catch (err) {

            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);


        }
        catch (err) {
            next(err);

        }
    }

    async googleAuthorization(req, res) {
        

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/calendar'
            ],
        });
        console.log(url);

        res.redirect(url);
    }

    async googleAuthorizationCallback(req, res) {
        try {
            const { code } = req.query;

            const { tokens } = await oauth2Client.getToken(code);
            console.log(tokens);
            oauth2Client.setCredentials(tokens);

            const userInfoFromGoogle = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });

            const userData = await userService.findOrCreateUserFromGoogle(userInfoFromGoogle.data, tokens.refresh_token);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            res.redirect(`${process.env.CLIENT_URL}`);
            
            // return res.json(userData);
        } catch (err) {
            console.error(err);

        
        }


    }

    async logout(req, res, next) {
        try {

            const { refreshToken } = req.cookies;

            const token = await userService.logout(refreshToken);
            res.clearCookie();

            return res.status(200).json(token);


        }
        catch (err) {
            next(err);

        }
    }


    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        }
        catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {

            const { refreshToken } = req.cookies;
            console.log("REFRESH", refreshToken);
            const userData = await userService.refresh(refreshToken);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        }
        catch (err) {
            next(err);

        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        }
        catch (err) {
            next(err);

        }
    }

    async getUser(req, res, next) {
        try {
            const user = await userService.getUserData(req.params.id, req.user.id);

            return res.json(user);

        } catch (err) {
            next(err);
        }

    }

    async getAllDoctors(req, res, next){
        try{
            const doctors = await userService.getAllDoctors();
            return res.json(doctors);
            
        }catch(err){
            next(err);
        }
    }

    async sendQuestion(req, res, next){
        try{
            console.log(req.body)
            const {name, question, email} = req.body;

            const response = await mailService.sendQuestion(name, email, question);

            return res.json(response);

        }catch(err){
            next(err)
        }
    }

}

module.exports = new userController();