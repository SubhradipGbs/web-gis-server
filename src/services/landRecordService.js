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

    if (!columnList) {
      const error = new Error("No columns found for vw_land_records");
      error.statusCode = 404;
      throw error;
    }


    const results = await sequelize.query(
      // `SELECT ${columnList} FROM vw_land_records LIMIT :limit OFFSET :offset`,
      `SELECT ${columnList} FROM vw_land_records`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { limit: 10, offset: 0 },
      }
    );

    if (!results) {
      const error = new Error("No land records found");
      error.statusCode = 404;
      throw error;
    }

    const filteredData = results.filter(
      (data) => data.category !== "RECORD NOT FOUND"
    );
    // const newData = filteredData.reduce((acc, plot) => {
    //   const existPlot = acc.find((item) => item.plot_id === plot.plot_id);
    //   const newOwner = {
    //     owner_address_or_raiayat: plot.owner_address_or_raiayat,
    //     owner_name_or_raiayat: plot.owner_name_or_raiayat,
    //     owner_share_in_plot: plot.owner_share_in_plot,
    //   };
    //   if (existPlot) {
    //     existPlot.owner.push(newOwner);
    //   } else {
    //     acc.push({ ...plot, owner: [newOwner] });
    //   }
    //   return acc;
    // }, []);

    const optData = Object.values(
      filteredData.reduce((acc, plot) => {
        const newOwner = {
          plot_id: plot.plot_id,
          lr_khatian_no: plot.lr_khatian_no,
          owner_name_or_raiayat: plot.owner_name_or_raiayat,
          owner_address_or_raiayat: plot.owner_address_or_raiayat,
          owner_share_in_plot: plot.owner_share_in_plot,
        };
        if (!acc[plot.plot_id]) {
          acc[plot.plot_id] = { ...plot, owner: [] };
        }
        acc[plot.plot_id].owner.push(newOwner);
        return acc;
      }, {})
    );
    return optData;
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
  } catch (err) { }
};

const getNewLandRecords = async () => {
  try {
    const results = await sequelize.query(
      "SELECT * FROM vw_grouped_land_records",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllRecords, getAllMasterLands, getNewLandRecords };

// await sequelize.query("SELECT * FROM vw_land_records LIMIT :limit OFFSET :offset", {
//   type: sequelize.QueryTypes.SELECT,
//   replacements: { limit: 10, offset: 0 },
// });
