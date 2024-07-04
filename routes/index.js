const express = require("express");
const path = require("path");
const router = express.Router();

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Returns all users from database
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Returns all users from the database.
 */
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
    console.log({ email, password, hashedPassword });
    const newUserData = new UserModel({ email, hashedPassword });
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *     description: User logs into the application.
 *     responses:
 *       200:
 *         description: Returns all users from the database.
 *       400:
 *         description: Invalid credentials?
 */
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
