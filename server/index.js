const express = require('express');
const cors = require('cors');
const pool = require('./db');

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route (No DB)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// DB Route: Get Server Time
app.get('/api/time', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as now');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('Error fetching time:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// ✅ NEW: Get all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM students ORDER BY id');
    res.status(200).json({
      count: result.rowCount,
      students: result.rows
    });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
