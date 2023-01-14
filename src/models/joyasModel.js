const pool = require("../helpers/connectionDb").getInstance();
const format = require("pg-format");

const getJoyas = async ({ limits = 10, order_BY = "id_ASC", page = 0 }) => {
    try {
        const [campo, direccion] = order_BY.split("_");
        const offset = (page - 1) * limits;
        const formattedQuery = format(
            "SELECT * FROM inventory ORDER BY %s %s LIMIT %s OFFSET %s",
            campo,
            direccion,
            limits,
            offset
        );
        console.log(formattedQuery);
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
    let filters = [];
    const values = [];
    const addFilter = (campo, comparador, valor) => {
        values.push(valor);
        const { length } = filters;
        filters.push(`${campo} ${comparador} $${length + 1}`);
    };

    if (precio_MAX) addFilter("price", "<=", precio_MAX);
    if (precio_MIN) addFilter("price", ">=", precio_MIN);
    if (category) addFilter("category", "=".category);
    if (metal) addFilter("metal", "=", metal);
    let consulta = "SELET * FROM inventory";
    if (filters.length > 0) {
        filters = filters.join(" AND ");
        consulta = +` WHERE ${filters}`;
    }

    console.log(consulta);

    const { rows: joyas } = await pool.query(consulta, values);

    return joyas;
};

module.exports = { getJoyas, getJoyasByFilters };
