const express = require("express");
const { createReferral } = require("../controllers/referralController");
const router = express.Router();

router.post("/", createReferral);

module.exports = router;
