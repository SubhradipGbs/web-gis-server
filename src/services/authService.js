const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const login = async (email, password) => {
  try {
    const results = await sequelize.query(
      `SELECT * FROM users WHERE email = :email`,
      {
        replacements: { email },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const user = results[0];
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        return [];
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { login };
