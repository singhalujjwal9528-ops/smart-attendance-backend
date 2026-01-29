
const express = require("express");
const router = express.Router();

const { startSession } = require("../controllers/session.controller");

router.post("/start", startSession);

module.exports = router;
