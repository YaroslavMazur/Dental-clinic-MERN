const Router = require("express").Router;
const {body} = require("express-validator");

const router = new Router();

const UserController = require("../controllers/userController");
const authMiddlware = require("../middlwares/authMiddlware");
const authValidations = require("../validations/authValidator");
const validationsHandlerMiddlware = require("../middlwares/validationsHandlerMiddlware");

router.post("/registration",
    authValidations.registerValidations,
    validationsHandlerMiddlware, 
    UserController.registration
);

router.post("/login", UserController.login);
    
router.post("/logout",UserController.logout);
router.get("/activate/:link",UserController.activate);
router.get("/refresh",UserController.refresh);
router.get("/users", authMiddlware, UserController.getUsers);

module.exports = router;
