const { Pool } = require("pg");
require("dotenv").config();
const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true,
};

const pool = new Pool(config);

module.exports = { pool };
