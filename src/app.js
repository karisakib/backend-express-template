require("dotenv").config();
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
// const mongoose = require("mongoose");

// Utility imports
const config = require("./config/config");

// Database imports
require("./db/mongoDB.js")

// Router imports
const redirectRouter = require("./routes/redirectRoutes.js");
const viewRouter = require("./routes/viewRoutes.js");
const apiRouter = require("./api/api.js");

// Mongo imports
const ApiKeyModel = require("./models/apiKeyModel.js");
const UserModel = require("./models/userModel.js");

// Swagger docs import
// const swaggerDocument = require("./swagger.json")
const file = fs.readFileSync("./swagger.yml", "utf8");
const swaggerDocument = YAML.parse(file);

// Database configs
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(console.log("Connection to MongoDB successful."))
//   .catch((error) => console.log(error));

// App init
const app = express();

// Set the views directory
app.set("views", path.join(__dirname, "views"));

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
app.use(express.static(path.join(__dirname, "../public")));

// Routers
app.use("/", redirectRouter);
app.use("/", viewRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", apiRouter);


// The infamous 404 route - ALWAYS Keep this as the last route
app.get("*", (req, res) => {
  res.status(404).send("Are you looking for something?");
});

// Express App
app.listen(config.PORT, () => {
  console.log(`App running on port http://localhost:${config.PORT}`);
});
