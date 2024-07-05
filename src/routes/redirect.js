const express = require("express");
const router = express.Router();

router.get("/from", (req, res) => {
 setTimeout(() => {
   res.redirect("to");
 }, 1000);
});

router.get("/to", (req, res) => {
 res.status(200).json({
   message: "redirect working",
 });
});

module.exports = router;