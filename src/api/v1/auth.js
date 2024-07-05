const express = require("express");
const router = express.Router();

// Path: /api/v1/auth/
router.get("/", (req, res) => {
  res.json({ message: "v1 Base auth route" });
});

router.post("/login", (req, res) => {
  res.json({ message: "v1 Login route" });
});

router.post("/register", (req, res) => {
  res.json({ message: "v1 Register route" });
});

// router.post("/keygen", async (req, res) => {
//   let { email } = req.body;
//   email = email.trim();
//   const generatedApiKey = crypto.randomBytes(16).toString("hex");
//   console.log(generatedApiKey);
//   try {
//     const newApiKeyData = new ApiKeyModel({ email, generatedApiKey });
//     const savedApiKeyData = await newApiKeyData.save();
//     console.log(savedApiKeyData);
//     res.status(201).json({
//       message: "Here is your new api key below",
//       apikey: generatedApiKey,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

module.exports = router;
