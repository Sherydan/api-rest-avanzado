const express = require("express");
const router = express.Router();

const { getAllJoyas, getFilteredJoyas } = require("../controllers/joyasController")
const { reportRequest } = require("../middlewares/logger")

router.get("/joyas", reportRequest, getAllJoyas)
router.get("/joyas/filters", reportRequest, getFilteredJoyas)

module.exports = router