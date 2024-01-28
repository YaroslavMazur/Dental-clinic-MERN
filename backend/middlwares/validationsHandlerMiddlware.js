const { validationResult } = require("express-validator");
const ApiErrors = require("../exceptions/apiErrors");

module.exports = function (req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("ERROR TUPE", errors);
        throw ApiErrors.ValidationErrors("validation error", errors.array());
    }
    else{

        next();
    }

}
