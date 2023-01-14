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
        console.log(formattedQuery)
        const { rows: joyas } = await pool.query(formattedQuery);
        
        return joyas;

    } catch (error) {
        console.log("Error while getting joyas", error.code, error.message);
        return error;
    }
};

module.exports = { getJoyas };
