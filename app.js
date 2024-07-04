require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");

// Utility imports
const config = require("./utils/config");

// Router imports
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const staticRouter = require("./routes/staticFiles");
const redirectRouter = require("./routes/redirect");
const templateRouter = require("./routes/templates");
const otpRouter = require("./routes/otp");


// Mongo imports
const ApiKeyModel = require("./models/apiKeyModel");
const UserModel = require("./models/userModel");

// App configs
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sample API Template",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Database configs
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("Connection to MongoDB successful."))
  .catch((error) => console.log(error));

// App init
const app = express();

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routers
// app.use("/", indexRouter);
app.use("/", staticRouter);
app.use("/", redirectRouter);
app.use("/", templateRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", usersRouter);
app.use("/otp", otpRouter)

app.post("/keygen", async (req, res) => {
  const { email } = req.body;
  email = email.trim();
  const generatedApiKey = crypto.randomBytes(16).toString("hex");
  console.log(generatedApiKey);
  try {
    const newApiKeyData = new ApiKeyModel({ email, generatedApiKey });
    const savedApiKeyData = await newApiKeyData.save();
    console.log(savedApiKeyData);
    res.status(201).json({
      message: "Here is your new api key below",
      apikey: generatedApiKey,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Testing user sign up
// app.post("/signup", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     email = email.trim();
//     password = password.trim();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log({ email, password, hashedPassword });
//     const newUserData = new UserModel({ email, hashedPassword });
//     const savedUserData = await newUserData.save();
//     console.log(savedUserData);
//     res.status(201).json({
//       message: "User registered",
//       email
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Testing user login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     email = email.trim();
//     password = password.trim();
//     const userCredentials = await UserModel.findOne({
//       email: req.body.email,
//     });
//     const isValid = await bcrypt.compare(
//       req.body.password,
//       userCredentials.hashedPassword
//     );
//     if (isValid) {
//       res.status(200).json({
//         message: "User authenticated.",
//       });
//     } else {
//       res.status(401).json({
//         message: "User authentication failed.",
//       });
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Testing X-API-KEY header
app.get("/db", (req, res) => {
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

// The infamous 404 route - ALWAYS Keep this as the last route
app.get("*", (req, res) => {
  res.status(404).send("Are you looking for something?");
});

// Express App
app.listen(config.PORT, () => {
  console.log(`App running on port http://localhost:${config.PORT}`);
});
