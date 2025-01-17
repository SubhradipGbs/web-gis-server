const sequelize = require("../config/database");

const createUser = async (user) => {
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
