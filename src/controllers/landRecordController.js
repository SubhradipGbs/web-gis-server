const sequelize = require("../config/database");
const { getAllRecords } = require("../services/landRecordService");

const fetchAllLandRecords = async (req, res) => {
  try {
    const results = await getAllRecords();
    res.status(200).json({data: results});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchAllLandRecords };
