const { validationResult } = require("express-validator");

module.exports = function (req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // const formattedErrors = errors.array().reduce((acc, error) => {

        //     acc[error.path] = error.msg;
        //     return acc;
        // }, {});

        return res.status(422).json(errors);
    }

    next();
}
