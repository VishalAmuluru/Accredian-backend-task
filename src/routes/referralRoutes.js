const express = require("express");
const { createReferral } = require("../controllers/referralController");
const router = express.Router();

// POST route to handle referral creation
router.post("/", createReferral);

module.exports = router;
