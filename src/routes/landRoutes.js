const express = require("express");
const {
  fetchAllLandRecords,
  fetchAllMasterLands,
} = require("../controllers/landRecordController");
const router = express.Router();

router.get("/land-all", fetchAllLandRecords);
router.get("/land-master", fetchAllMasterLands);

module.exports = router;
