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
      // `SELECT ${columnList} FROM vw_land_records LIMIT :limit OFFSET :offset`,
      `SELECT ${columnList} FROM vw_land_records`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { limit: 10, offset: 0 },
      }
    );
    const filteredData = results.filter(
      (data) => data.category !== "RECORD NOT FOUND"
    );
    return filteredData;
  } catch (error) {
    throw error;
  }
};

const getAllMasterLands = async () => {
  try {
    const results = await sequelize.query("SELECT * FROM master_land_plots", {
      type: sequelize.QueryTypes.SELECT,
    });
    return results;
  } catch (err) {}
};

module.exports = { getAllRecords, getAllMasterLands };

// await sequelize.query("SELECT * FROM vw_land_records LIMIT :limit OFFSET :offset", {
//   type: sequelize.QueryTypes.SELECT,
//   replacements: { limit: 10, offset: 0 },
// });
