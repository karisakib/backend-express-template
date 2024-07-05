const express = require("express");
const router = express.Router();

router.get('/about', (req, res) => {
 res.render('pages/about');
 // Do not include the EJS file extension
});

module.exports = router;