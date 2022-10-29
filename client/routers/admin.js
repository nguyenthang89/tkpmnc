const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.post("/", adminController.dashboard);
router.post("/coordinator", adminController.coordinator);
router.post("/book-car", adminController.bookCar);
router.post("/post-book-car", adminController.postBookCar);
module.exports = router;