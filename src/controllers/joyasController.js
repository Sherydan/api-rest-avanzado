const {getJoyas} = require("../models/joyasModel")

const getAllJoyas = async (req, res) => {
    try {
        const joyas = await getJoyas(req.query)
        res.json(joyas)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getAllJoyas}