const express = require("express");
const {
  fetchAllLandRecords,
  fetchAllMasterLands,
  fetchNewLandRecords,
} = require("../controllers/landRecordController");
const router = express.Router();

router.get("/land-all", fetchAllLandRecords);
router.get("/land-new", fetchNewLandRecords);
router.get("/land-master", fetchAllMasterLands);

module.exports = router;
