const express = require("express");
const router = express.Router();

const { getAllJoyas, getFilteredJoyas } = require("../controllers/joyasController")
const { reportRequest } = require("../middlewares/logger")

router.get("/joyas", reportRequest, getAllJoyas)
router.get("/joyas/filters", reportRequest, getFilteredJoyas)
router.all("*", (req, res) => {
    res.status(404).send("Endpoint not found!")
})

module.exports = router