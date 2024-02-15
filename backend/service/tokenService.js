const jwt = require("jsonwebtoken");
const tokenModel = require("../models/tokenModel")

class tokenService{


    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:"15m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:"30d"});

        return{
            accessToken, 
            refreshToken
        }
    }

    async saveToken(userId, refreshToken ,googleRefreshToken){
        try {

            const tokenData = await tokenModel.findOne({ user: userId });
    
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                if (googleRefreshToken !== undefined) { // Змінено умову тут
                    tokenData.googleRefreshToken = googleRefreshToken;
                }
                return tokenData.save();
            }
    
            const token = await tokenModel.create({ user: userId, refreshToken, googleRefreshToken });
            return token;
        } catch (error) {
            // Обробка помилок бази даних
            console.error("Помилка при збереженні токену:", error);
            throw error;
        }
    }

    async  removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }
    
    async findToken(refreshToken){
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }

    verifyAccessToken(accessToken){
        try{

            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;

        }catch{ return null; }
    }

    
    verifyRefreshToken(refreshToken){
        try{

            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;

        }catch{
            return null;
        }
    }
}

module.exports = new tokenService();