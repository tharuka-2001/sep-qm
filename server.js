// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Dummy login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'testuser' && password === 'password123') {
    return res.json({
      success: true,
      data: { id: '123', username, token: 'mock-jwt-token' }
    });
  }
  return res.status(401).json({
    success: false,
    message: 'Invalid username or password'
  });
});

// Dummy registration endpoint
app.post('/api/register', (req, res) => {
  // you could inspect req.body here if you want
  return res.json({
    success: true,
    message: 'Registration successful! Please login.'
  });
});

// Optional username-availability check
app.get('/api/check-username/:username', (req, res) => {
  // always “available” in our demo
  res.json({ available: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`⚡ Auth API mock running at http://localhost:${PORT}`);
});
