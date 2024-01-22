const Router = require("express").Router;
const {body} = require("express-validator");

const router = new Router();

const UserController = require("../controllers/userController");
const authMiddlware = require("../middlwares/authMiddlware");

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min:3, max: 32})

    ,UserController.registration
);

router.post("/login", UserController.login);
router.post("/logout",UserController.logout);
router.get("/activate/:link",UserController.activate);
router.get("/refresh",UserController.refresh);
router.get("/users",authMiddlware, UserController.getUsers);

module.exports = router;
