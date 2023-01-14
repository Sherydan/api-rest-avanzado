const express = require("express");
const router = express.Router();

const { getAllJoyas } = require("../controllers/joyasController")

router.get("/joyas", getAllJoyas)

module.exports = router