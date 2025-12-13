const express = require('express');
const cors = require('cors');
const pool = require('./db');
const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json());

// Test Route (No DB)
app.get('/', (req, res) => {
    res.send('Backend is running!!');
});

// DB Route: Get Server Time
app.get('/api/time', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as now');
        res.json({ time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});