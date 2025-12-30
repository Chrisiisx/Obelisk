const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Funzione helper per eseguire query
const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };
