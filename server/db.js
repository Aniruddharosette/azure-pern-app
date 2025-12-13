const { Pool } = require('pg');
require('dotenv').config();

// Azure Postgres requires SSL connections
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for Azure Flexible Server default setup
    }
});

module.exports = pool;