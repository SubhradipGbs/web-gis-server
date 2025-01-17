const express = require("express");
const { userLogin, userLogout } = require("../controllers/authController");

const router = express.Router();

router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;
