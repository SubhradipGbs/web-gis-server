const bcrypt = require("bcryptjs");

const hashPassword = async (req, res, next) => {
  // hash password
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
};


module.exports = { hashPassword };