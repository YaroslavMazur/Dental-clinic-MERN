const ApiErrors = require("../exceptions/apiErrors");
const tokenService = require("../service/tokenService");

module.exports = function(req, res, next){

    try{
        const authorizationHeader = req.headers.authorization;

        if(!authorizationHeader){
            return next(ApiErrors.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(" ")[1];

        if(!accessToken){
            return next(ApiErrors.UnauthorizedError());
        }

        const userData = tokenService.verifyAccessToken(accessToken);

        if(!userData){
            return next(ApiErrors.UnauthorizedError());
        }

        req.user = userData;

        next();

    }catch(e){
        return next(ApiErrors.UnauthorizedError())
    }

}