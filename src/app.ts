import { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import YAML from "yaml";
import cookieParser from "cookie-parser";
import compression from "compression";
import session from "express-session";
import createHttpError from "http-errors";
import express from "express"
import cors from "cors";
import helmet from "helmet"
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';


// Utility imports
import config from "./config/config"

// Database imports

// Router imports
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users.js");
const staticRouter = require("./routes/staticFiles.js");
const redirectRouter = require("./routes/redirect.js");
const templateRouter = require("./routes/templates.js");
const otpRouter = require("./routes/otp.js");


// Mongo imports
const ApiKeyModel = require("./models/apiKeyModel.js");
const UserModel = require("./models/userModel.js");

// Swagger docs import
const file = fs.readFileSync('./swagger.yml', 'utf8')
const swaggerDocument = YAML.parse(file)

// Database configs
mongoose
 .connect(process.env.MONGODB_URL)
 .then(console.log("Connection to MongoDB successful."))
 .catch((error) => console.log(error));

// Initialize Express App
const app: Express = express();

// Set the views directory
app.set('views', path.join(process.cwd(), 'src', 'views'));

// Set view engine
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
app.use("/", indexRouter);
app.use("/", staticRouter);
app.use("/", redirectRouter);
app.use("/", templateRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users", usersRouter);
app.use("/otp", otpRouter)

// The infamous 404 route - ALWAYS Keep this as the last route
app.get("*", (req, res) => {
 res.status(404).send("Are you looking for something?");
});

// Express App
app.listen(config.PORT, () => {
 console.log(`App running on port http://localhost:${config.PORT}`);
});
