const { getJoyas, getJoyasByFilters } = require("../models/joyasModel");

const getAllJoyas = async (req, res) => {
    try {
        const joyas = await getJoyas(req.query);
        const HATEOAS = await prepareHATEOAS(joyas);
        res.json(HATEOAS);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while obtaining data" });
    }
};

const getFilteredJoyas = async (req, res) => {
    try {
        const joyas = await getJoyasByFilters(req.query);
        res.json(joyas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while obtaining data" });
    }
};

const prepareHATEOAS = (joyas) => {
    // if no error, prepare HATEOAS
    if (!joyas.error) {
        const totalStock = joyas.reduce((s, j) => s + j.stock, 0);
        const results = joyas
            .map((j) => {
                return {
                    name: j.name,
                    href: `/joyas/joya/${j.id}`,
                };
            })
            .slice(0, 4);

        const total = joyas.length;
        const HATEOAS = {
            total,
            totalStock,
            results,
        };

        return HATEOAS;
    }
    // if error, return error message
    return joyas.error;
};

module.exports = { getAllJoyas, getFilteredJoyas };
