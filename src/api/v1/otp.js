const express = require("express");
const router = express.Router();

const sendOTP = require("../../handlers/otpHandler");

// Path: /api/v1/otp/
router.post("/", async (req, res) => {
  try {
   let { email, subject, message, duration } = req.body;

   const createdOTP = await sendOTP({
    email,
    subject,
    message,
    duration
   })

   res.status(201).json(createdOTP);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
 try {
  res.status(200).json({
   message: "v1 - OTP route"
});
 } catch (error) {
   res.status(400).json({ error: error.message });
 }
});


module.exports = router;
