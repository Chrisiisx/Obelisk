const { Pool } = require('pg');
const dotenv = require("dotenv");
dotenv.config({
    path: '../.env'
})

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Funzione helper per eseguire query
const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };
