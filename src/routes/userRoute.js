const express = require("express");
const { hashPassword } = require("../middlewares/authMiddleware");
const { newUser } = require("../controllers/userController");

const router = express.Router();

router.post("/add-new", hashPassword, newUser);


module.exports = router;