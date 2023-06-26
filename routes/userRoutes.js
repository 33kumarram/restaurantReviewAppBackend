const express = require("express");
const { register, logIn } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(logIn);

module.exports = router;
