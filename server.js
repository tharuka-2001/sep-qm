// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Dummy login endpoint
app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    
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
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Dummy registration endpoint
app.post('/api/register', (req, res) => {
  try {
    const { username, password, email } = req.body;

    
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    
    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    return res.json({
      success: true,
      message: 'Registration successful! Please login.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Username availability check
app.get('/api/check-username/:username', (req, res) => {
  try {
    const { username } = req.params;

    
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }

    
    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters long'
      });
    }

    // Check if username is 'testuser' (unavailable)
    if (username === 'testuser') {
      return res.json({
        available: false
      });
    }

    // All other usernames are available
    return res.json({
      available: true
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`⚡ Auth API mock running at http://localhost:${PORT}`);
});
