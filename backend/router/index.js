const Router = require("express").Router;

const router = new Router();

const UserController = require("../controllers/userController");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout",UserController.logout);
router.get("/activate/:link",UserController.activate);
router.get("/refresh",UserController.refresh);
router.get("/users",UserController.getUsers);

module.exports = router;
