const express = require("express");
const router = express.Router();

const { getAllJoyas } = require("../controllers/joyasController")
const { reportRequest } = require("../middlewares/logger")

router.get("/joyas", reportRequest, getAllJoyas)

module.exports = router