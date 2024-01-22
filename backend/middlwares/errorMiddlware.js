const ApiErrors = require("../exceptions/apiErrors");

module.exports = function(err, req, res, next){

    console.log(err);
    if(err instanceof ApiErrors){
        return res.status(err.status).json({
            msg: err.message,
            err: err.errors,
        })
    }

    return res.status(500).json({
        msg: "Непередбачена помилка",
    })
}