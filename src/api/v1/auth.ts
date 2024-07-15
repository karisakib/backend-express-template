import { Express, Request, Response, NextFunction, Router } from "express";
import express from "express";
import bcrypt from "bcrypt";

const router: Router = express.Router();

// Define your API routes
router.get('/', (req: Request, res: Response) => {
 res.json({ message: 'v1 Base auth route' });
});

// Testing user sign up
router.post("/signup", async (req: Request, res: Response) => {
 try {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log({ email, password, hashedPassword });
  const newUserData = new UserModel({ email, hashedPassword });
  const savedUserData = await newUserData.save();
  console.log(savedUserData);
  res.status(201).json({
   message: "User registered",
   email
  });
 } catch (err) {
  res.status(400).json({ error: err.message });
 }
});

router.post("/keygen", async (req: Request, res: Response) => {
 let { email } = req.body;
 email = email.trim();
 const generatedApiKey = crypto.randomBytes(16).toString("hex");
 console.log(generatedApiKey);
 try {
  const newApiKeyData = new ApiKeyModel({ email, generatedApiKey });
  const savedApiKeyData = await newApiKeyData.save();
  console.log(savedApiKeyData);
  res.status(201).json({
   message: "Here is your new api key below",
   apiKey: generatedApiKey,
  });
 } catch (error) {
  res.status(400).json({ error: error.message });
 }
});



// Testing user login
router.post("/login", async (req: Request, res: Response) => {
 try {
  // Get req.body data from client
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (!email && !password) {
   throw Error("Email and password required.")
  }

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

// Testing X-API-KEY header
router.get("/db", (req: Request, res: Response) => {
 if (!req.header("X-API-KEY")) {
  res.status(401).json({
   message: "401 Unauthorized. Are you missing an API Key in your request?",
  });
 } else {
  res.status(200).json({
   db: {
    users,
    apikeys,
   },
  });
 }
});


export { router }
