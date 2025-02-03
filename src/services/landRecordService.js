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
      // `SELECT
      //     plot_id,
      //     objectid,
      //     mouza_name,
      //     category,
      //     lr_plot_no,
      //     rs_plot_no,
      //     total_area_in_acres,
      //     classification,
      //     present_use,
      //     JSON_AGG(
      //         JSON_BUILD_OBJECT(
      //             'owner_name', owner_name_or_raiayat,
      //             'lr_khatian_no', lr_khatian_no,
      //             'owner_address_or_raiayat', owner_address_or_raiayat,
      //             'owner_share_in_plot', owner_share_in_plot
      //         )
      //     ) AS owner,
      //     area_owned_in_acres,
      //     patta,
      //     bargadar_name,
      //     barga_share_area_in_acres,
      //     distance_from_nh_meters,
      //     distance_from_metalled_road_meters,
      //     market_value_as_per_egov_assessment,
      //     coal_mining_value,
      //     lao_assessed_value,
      //     plotno
      //  FROM
      //     vw_land_records
      //  GROUP BY
      //     plot_id,
      //     objectid,
      //     mouza_name,
      //     category,
      //     lr_plot_no,
      //     rs_plot_no,
      //     total_area_in_acres,
      //     classification,
      //     present_use,
      //     area_owned_in_acres,
      //     patta,
      //     bargadar_name,
      //     barga_share_area_in_acres,
      //     distance_from_nh_meters,
      //     distance_from_metalled_road_meters,
      //     market_value_as_per_egov_assessment,
      //     coal_mining_value,
      //     lao_assessed_value,
      //     plotno`,
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
