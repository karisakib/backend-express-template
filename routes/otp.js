var express = require('express');
var router = express.Router();

// const ApiKeyModel = require("./models/apiKeyModel");
const OTPModel = require("../models/otpModel");

/**
 * @swagger
 * /otp:
 *   post:
 *     summary: Creates an OTP
 *     description: Creates an OTP
 *     responses:
 *       201:
 *         description: OTP created
 */
router.post("/otp", async (req, res) => {
 try {
   const documents = await OTPModel.find({});
   res.status(201).json(documents);
 } catch (err) {
   res.status(400).json({ error: err.message });
 }
});

/**
 * @swagger
 * /otp:
 *   get:
 *     summary: Returns all users from database
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Returns all users from the database.
 */
router.get("/:id", async (req, res) => {
 try {
  const id = req.params.id;
   res.status(200).json({"params":id});
 } catch (err) {
   res.status(400).json({ error: err.message });
 }
});

module.exports = router;
