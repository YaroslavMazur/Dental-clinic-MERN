const {body} = require("express-validator");

const registerValidations = [
    body('email', "Неправильний формат email").isEmail(), 
    body("fullName", "Занадто коротке ім'я").isLength({min:3}),
    body("fullName", "Занадто коротке ім'я").isLength({min:3}),

    body("password").
        isLength({min:5}).
        withMessage("Занадто короткий пароль").
        matches(/^(?=.*[A-Z])(?=.*\d).{5,}$/).
        withMessage("Пароль має містити літери в верхньому регістрі та числа"),

    body("phoneNumber","Занадто короткий номер").isLength({min:7}),
    body("phoneNumber","Занадто довгий номер").isLength({max:15}),

];


const loginValidations = [
    body('email', "Неправильний формат email").isEmail(),
    body("password", "Занадто короткий пароль").isLength({min:5}),
];


module.exports = { registerValidations, loginValidations };
