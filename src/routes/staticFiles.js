const express = require("express");
const path = require("path")
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/static/index.html"));
});

router.get("/tests", (req, res) => {
 res.sendFile(path.join(process.cwd(), "reports/index.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/static/sign-up.html"));
});

router.get("/reset", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/static/pwd-reset.html"));
});

router.get("/apikey", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/static/api-key.html"));
});

module.exports = router;
