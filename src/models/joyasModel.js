const pool = require("../helpers/connectionDb").getInstance();
const format = require("pg-format");

const getJoyas = async ({ limits = 10, order_BY = "id_ASC", page = 0 }) => {
    const [campo, direccion] = order_BY.split("_");
    const offset = page * limits;
    const formattedQuery = format(
        "SELECT * FROM inventory ORDER BY %s %s LIMIT %s OFFSET %s",
        campo,
        direccion,
        limits,
        offset
    );

    const {rows: joyas} = await pool.query(formattedQuery)

    return joyas
};

module.exports = {getJoyas}
