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

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    return user;

  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const serverError = new Error("Internal server error");
    serverError.statusCode = 500;
    throw serverError;
  }
};


const createUserLog = async (log) => {
  try {
    const results = await sequelize.query(
      `INSERT INTO user_log (user_id, action, status) VALUES (:userId, :action, :status) RETURNING *`,
      {
        replacements: log,
        type: sequelize.QueryTypes.INSERT,
      }
    );
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { login };