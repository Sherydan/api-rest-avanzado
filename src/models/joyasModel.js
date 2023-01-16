const {pool} = require("../helpers/connectionDB")
const { validateGetJoyasOrder} = require("../helpers/validation")
const format = require("pg-format");

const getJoyas = async ({ limits = 10, order_BY = "id_ASC", page = 0 }) => {
    //check if arguments are null or undefined, if so set them to default values
    if (!limits || limits == null || limits == undefined) limits = 10;
    if (!order_BY || order_BY == null || order_BY == undefined) order_BY = "id_ASC";
    if (!page || page == null || page == undefined) page = 0;
    
    //if order_BY is not valid, return error
    if (validateGetJoyasOrder(order_BY)) {
        return joyas = {error: "Invalid order"};
    }
    
    try {
        const [campo, direccion] = order_BY.split("_");
        // offset cant be negative, so when page equals 0 offset is set to 0
        const offset = (page == 0) ? 0 : (page - 1) * limits
        const formattedQuery = format(
            "SELECT * FROM inventory ORDER BY %s %s LIMIT %s OFFSET %s",
            campo,
            direccion,
            limits,
            offset
        );
        const { rows: joyas } = await pool.query(formattedQuery);

        return joyas;
    } catch (error) {
        console.log("Error while getting joyas", error.code, error.message);
        return error;
    }
};

const getJoyasByFilters = async ({
    precio_MAX,
    precio_MIN,
    category,
    metal,
}) => {
    try {
        let filters = [];
        const values = [];
        const addFilter = (campo, comparador, valor) => {
            values.push(valor);
            const { length } = filters;
            filters.push(`${campo} ${comparador} $${length + 1}`);
        };

        if (precio_MAX) addFilter("price", "<=", precio_MAX);
        if (precio_MIN) addFilter("price", ">=", precio_MIN);
        if (category) addFilter("category", "=", category);
        if (metal) addFilter("metal", "=", metal);
        let consulta = "SELECT * FROM inventory";
        if (filters.length > 0) {
            filters = filters.join(" AND ");
            consulta += ` WHERE ${filters}`;
        }

        const { rows: joyas } = await pool.query(consulta, values);

        return joyas;
    } catch (error) {
        console.log("Error while getting filtered joyas", error.code, error.message);
        return error;
    }
};

module.exports = { getJoyas, getJoyasByFilters };
