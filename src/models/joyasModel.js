const pool = require("../helpers/connectionDb").getInstance();
const format = require("pg-format");

const getJoyas = async ({ limits = 10, order_BY = "id_ASC", page = 0 }) => {
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
