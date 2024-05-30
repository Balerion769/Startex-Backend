const { Pool } = require('pg');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: "assignment_hs5z_user",
  password: "KtjZ0c9bnqsGwR5YNeLCgqnc2cdK6rNC",
  database: "assignment_hs5z",
  port: 5432,
  host: "dpg-cpc4h7jtg9os73cuetsg-a",
});

pool.connect()  // Connect using the pool instance
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL', err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Test route to check database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected successfully. Server time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
