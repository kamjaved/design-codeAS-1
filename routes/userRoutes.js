const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);


//Protect all routes after this middleware
router.use(authController.protect);

router.get("/me", authController.getMe, authController.getUser);


module.exports = router;
