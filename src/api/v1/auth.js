const express = require('express');
const router = express.Router();

// Define your API routes
router.get('/', (req, res) => {
 // Handle login
 res.json({ message: 'v1 Base auth route' });
});

router.post('/login', (req, res) => {
  // Handle login
  res.json({ message: 'v1 Login route' });
});

router.post('/register', (req, res) => {
  // Handle registration
  res.json({ message: 'v1 Register route' });
});

module.exports = router;
