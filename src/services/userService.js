const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const createUser = async (user) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  user.password = passwordHash;
  try {
    const results = await sequelize.query(
      `INSERT INTO users (name, email, phoneno, password, roleId) VALUES (:name, :email, :phoneno, :password, :roleId) RETURNING *`,
      {
        replacements: user,
        type: sequelize.QueryTypes.INSERT,
      }
    );
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };
