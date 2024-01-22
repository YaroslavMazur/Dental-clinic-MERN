module.exports = class ApiErrors extends Error{
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.errors = errors;
        this.status = status;
    }

    static UnauthorizedError(){

        return new ApiErrors(401, "користувач не авторизований");
    }

    static BadRequest(message, errors = []){
        return new ApiErrors(400, message, errors);
    }
    
}