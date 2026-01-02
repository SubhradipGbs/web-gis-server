const { error } = require("winston");
const sequelize = require("../config/database");
const {
  getAllRecords,
  getAllMasterLands,
  getNewLandRecords,
  getAllMouza,
  getLandRecordByKhatian,
  getLandRecordByPlot,
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

const fetchLandByKhatian = async (req, res) => {
  try {
    const khatian_no = req.body.khatian_no;
    const mouza = req.body.mouza_name;
    const results = await getLandRecordByKhatian(khatian_no, mouza);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchLandByPlot = async (req, res) => {
  try {
    const plot = req.body.plot_no;
    const mouza = req.body.mouza_name;
    const results = await getLandRecordByPlot(plot, mouza);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const fetchAllMouza = async (req, res) => {
  try {
    const results = await getAllMouza();
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchAllLandRecords,
  fetchAllMasterLands,
  fetchNewLandRecords,
  fetchAllMouza,
  fetchLandByKhatian,
  fetchLandByPlot,
};
