const express = require("express");
const {
  fetchAllLandRecords,
  fetchAllMasterLands,
  fetchNewLandRecords,
  fetchAllMouza,
  fetchLandByKhatian,
  fetchLandByPlot,
} = require("../controllers/landRecordController");
const router = express.Router();

router.get("/land-all", fetchAllLandRecords);
router.get("/land-new", fetchNewLandRecords);
router.get("/land-master", fetchAllMasterLands);
router.get('/get-mouza', fetchAllMouza);
router.post("/land-by-khatian", fetchLandByKhatian);
router.post("/land-by-plot", fetchLandByPlot);

module.exports = router;
