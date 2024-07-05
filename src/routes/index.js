const express = require("express");
const path = require("path");
const UserModel = require("../models/userModel");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    firstName = firstName.trim();
    lastName = firstName.trim();
    email = email.trim();
    password = password.trim();
    if (!firstName && !lastName && !email && !password) {
      throw Error(
        "First name, last name, email, password fields are required."
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = new UserModel({ firstName, lastName, email, hashedPassword });
    const savedUserData = await newUserData.save();
    console.log(savedUserData);
    res.status(201).json({
      message: "User registered",
      email,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/reset", async (req, res) => {
 try {
   let { email } = req.body;
   email = email.trim();
   if (!email) {
     throw Error(
       "Email is a required field."
     );
   }
   const user = UserModel.find({ filter : {"email": email}})
   if (!user) {
    throw Error(`User with email ${email} could not be found.`)
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
    const { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    const userCredentials = await UserModel.findOne({
      email: req.body.email,
    });
    const isValid = await bcrypt.compare(
      req.body.password,
      userCredentials.hashedPassword
    );
    if (isValid) {
      res.status(200).json({
        message: "User authenticated.",
      });
    } else {
      res.status(401).json({
        message: "User authentication failed.",
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
