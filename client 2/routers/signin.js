const express = require("express");
const router = express.Router();
const signinController = require("../controllers/signinController");
router.get("/", signinController.signin);
router.post("/", signinController.postSignin);


module.exports = router;