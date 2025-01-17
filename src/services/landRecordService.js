const sequelize = require("../config/database");

const getAllRecords = async () => {
  try {
    const columnsResult = await sequelize.query(
      `
      SELECT string_agg(column_name, ', ') AS columns
      FROM information_schema.columns
      WHERE table_name = 'vw_land_records' AND column_name != 'shape';
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    const columnList = columnsResult[0]?.columns;
    const results = await sequelize.query(
      `SELECT ${columnList} FROM vw_land_records LIMIT :limit OFFSET :offset`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { limit: 10, offset: 0 },
      }
    );
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllRecords };

// await sequelize.query("SELECT * FROM vw_land_records LIMIT :limit OFFSET :offset", {
//   type: sequelize.QueryTypes.SELECT,
//   replacements: { limit: 10, offset: 0 },
// });
