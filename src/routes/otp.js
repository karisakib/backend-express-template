var express = require('express');
var router = express.Router();

// const ApiKeyModel = require("./models/apiKeyModel");
const OTPModel = require("../models/otpModel");

router.post("/otp", async (req, res) => {
 try {
   const documents = await OTPModel.find({});
   res.status(201).json(documents);
 } catch (err) {
   res.status(400).json({ error: err.message });
 }
});

router.get("/:id", async (req, res) => {
 try {
  const id = req.params.id;
   res.status(200).json({"params":id});
 } catch (err) {
   res.status(400).json({ error: err.message });
 }
});

module.exports = router;
