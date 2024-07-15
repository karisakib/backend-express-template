const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../../models/userModel");
const OTPModel = require("../../models/otpModel");
const { hashData, verifyHashedData } = require("../../utils/hashData");
const { error } = require("console");
const { authenticateUser } = require("../../handlers/userHandler")

const auth = require("../../middleware/authMiddleware")

// Path: /api/v1/users/
router.get("/", (req, res) => {
  res.json({ message: "v1 Users route" });
});

// Protected route
router.get("/protected-route",auth, (req, res) => {
 res.status(200).json({ message: `You're in private territory: ${req.currentUser.email}` });
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).json({ params: id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    if (!firstName && !lastName && !email && !password) {
      throw Error(
        "First name, last name, email, password fields are required."
      );
    }
    // Regex validations
    // Check if name passes regex

    // Check if email passes regex

    // Check if password passes regex

    // Hash password
    // const hashedPassword = hashData(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = new UserModel({
      firstName,
      lastName,
      email,
      hashedPassword,
    });
    // Save user
    const createdUserData = await newUserData.save();
    console.log(createdUserData);
    res.status(201).json({
      message: "User registered",
      data: createdUserData,
    });

    // Send Email verification (OTP expires in 60 seconds and will need to request a new one)

    // SMS verification (Twilio API - OTP expires in 60 seconds and will need to request a new one)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/verify", async (req, res) => {
  try {
    let { email, otp } = req.body;
    email.trim();
    otp.trim();

    // Find user by the email
    const unverifiedUser = OTPModel.findOne({ email });

    if (!(email && otp)) {
      throw Error("Email and OTP required!");
    } else if (unverifiedUser.otp === otp) {
      // Verify User Account

      // Complete user registration

      // Delete OTP from DB

      res.status(201).json({
        message: "User email verified",
        data: createdUserData,
      });

      // Redirect user to his home page
    }
    // Send Email verification OTP
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/reset", async (req, res) => {
  try {
    let { email } = req.body;
    email = email.trim();
    if (!email) {
      throw Error("Email is a required field.");
    }
    const user = UserModel.find({ filter: { email: email } });
    if (!user) {
      throw Error(`User with email ${email} could not be found.`);
    }
    console.log(user);
    res.status(201).json({
      message: "User Found",
      // data: user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Grab user data from request body
    let { email, password } = req.body;
    // Trim any excess whitespace
    email = email.trim();
    password = password.trim();

    // Handle error - no username or password
    if (!email || !password) {
      throw Error("Email and password are required!");
    }

    // console.log(`working up to here`);

    // Attempt to authenticate user
    const authenticatedUser = await authenticateUser({ email, password });

    // Successful response
    if (!authenticatedUser) {
      res.status(401).json({
        message: "User authentication failed.",
      });
    }

    res.status(200).json({
      message: "User authenticated.",
      data: authenticatedUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
