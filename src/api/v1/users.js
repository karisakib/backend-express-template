const express = require('express');
const router = express.Router();

// Define your API routes
router.get('/', (req, res) => {
  // Handle fetching users
  res.json({ message: 'v1 Users route' });
});

module.exports = router;