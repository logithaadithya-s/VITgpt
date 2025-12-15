const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Parse incoming request bodies
app.use(express.json());

// Serve profile1.html directly for profile page
app.get('/profile1', (req, res) => {
  res.sendFile(path.join(__dirname, 'profile1.html'));
});

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Logith*2525',
  database: 'vitgpt'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ DB connection error:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// Register endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertSql, [name, email, password], (err, result) => {
      if (err) return res.status(500).json({ message: 'Registration failed' });
      res.status(200).json({ message: 'Registration successful' });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login failed' });

    if (results.length > 0) {
      res.status(200).json({
        message: 'Login successful',
        user: {
          name: results[0].name,
          email: results[0].email
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Get contribution count for a user
app.get('/api/user-contribution', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM papers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching count:', err);
      return res.status(500).send('Error fetching count');
    }
    res.json({ count: results[0].count });
  });
});

// Upload paper endpoint
app.post('/api/upload-paper', (req, res) => {
  const { slot, exam, subject, year, semester, url } = req.body;

  if (!slot || !exam || !subject || !year || !semester || !url) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields" 
    });
  }

  const query = `
    INSERT INTO papers (slot, exam, subject, year, semester, files)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [slot, exam, subject, year, semester, url], (err, result) => {
    if (err) {
      console.error("❌ Error inserting paper:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Database error",
        error: err.message // Include specific error
      });
    }

    // Modified success response
    res.status(200).set('Content-Type', 'application/json').json({ 
      success: true, 
      message: "Paper uploaded successfully!",
      paperId: result.insertId
    });
  });
});

// Catch-all for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});