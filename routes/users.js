var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: test
 *     description: Welcome to Sample API Template!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', (req, res) => {
 res.redirect('docs').status(200).json({
   message: "working"
 }).r;
});

module.exports = router;
