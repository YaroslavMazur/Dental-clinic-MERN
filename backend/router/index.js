const Router = require("express").Router;

const router = new Router();

const UserController = require("../controllers/userController");
const AppointmentController = require("../controllers/appointmentController");
const authMiddlware = require("../middlwares/authMiddlware");
const authValidations = require("../validations/authValidator");
const validationsHandlerMiddlware = require("../middlwares/validationsHandlerMiddlware");

router.post("/registration",
    authValidations.registerValidations,
    validationsHandlerMiddlware, 
    UserController.registration
);
router.get("/auth/google", UserController.googleAuthorization);
router.get("/auth/google/callback", UserController.googleAuthorizationCallback);


router.post("/login", UserController.login);
    
router.post("/logout",UserController.logout);
router.get("/activate/:link",UserController.activate);
router.get("/refresh",UserController.refresh);
router.get("/users", authMiddlware, UserController.getUsers);
router.get("/userData/:id", authMiddlware, UserController.getUser);

router.post("/addAppointment", authMiddlware, AppointmentController.addAppointment)

module.exports = router;
