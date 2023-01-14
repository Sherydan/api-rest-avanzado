const { getJoyas } = require("../models/joyasModel");

const getAllJoyas = async (req, res) => {
    try {
        const joyas = await getJoyas(req.query);
        const HATEOAS = await prepareHATEOAS(joyas)
        res.json(HATEOAS);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while obtaining data" });
    }
};

const prepareHATEOAS = (joyas) => {
    const totalStock = joyas.reduce((s, a) => s + a.stock, 0)
    const results = joyas.map((j) => {
        return {
            name: j.name,
            href: `/joyas/joya/${j.id}`,
        }
    }).slice(0, 4)

    const total = joyas.length
    const HATEOAS = {
        total,
        totalStock,
        results,
    }

    return HATEOAS
};

module.exports = { getAllJoyas, };
