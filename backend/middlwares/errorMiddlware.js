const ApiErrors = require("../exceptions/apiErrors");

module.exports = function(err, req, res, next){

    if(err instanceof ApiErrors){
        return res.status(err.status).json({
            msg: err.message,
            errors: err.errors,
        })
    }
    console.error(err);
    return res.status(500).json({
        msg: "Непередбачена помилка",
        errors: err.message,
    })
}

