const sequelize = require("../config/database");
const {
  getAllRecords,
  getAllMasterLands,
  getNewLandRecords,
} = require("../services/landRecordService");

const fetchAllLandRecords = async (req, res) => {
  try {
    const results = await getAllRecords();
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchNewLandRecords = async (req, res) => {
  try {
    const results = await getNewLandRecords();
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllMasterLands = async (req, res) => {
  try {
    const results = await getAllMasterLands();
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchAllLandRecords,
  fetchAllMasterLands,
  fetchNewLandRecords,
};
