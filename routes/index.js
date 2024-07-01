const express = require('express');
const path = require("path");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: test
 *     description: Welcome to Sample API Template!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', (req, res) => {
  // res.status(200).json({
  //   message: "working"
  // });
  res.sendFile(path.join(__dirname, 'pages/index.html')).json({ message: "working"})
});

module.exports = router;
