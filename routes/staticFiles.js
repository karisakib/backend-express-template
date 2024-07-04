const express = require("express");
const path = require("path")
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "static/index.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(process.cwd(), "pages/sign-up.html"));
});

router.get("/reset", (req, res) => {
  res.sendFile(path.join(process.cwd(), "pages/pwd-reset.html"));
});

router.get("/apikey", (req, res) => {
  res.sendFile(path.join(process.cwd(), "pages/api-key.html"));
});

module.exports = router;
