const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
router.post("/", driverController.dashboard);
router.post("/update-info", driverController.updateInfo);
router.post("/post-update-info", driverController.postUpdateInfo);
module.exports = router;