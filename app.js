const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Router imports
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// App configs
const config = require("./utils/config");
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

// App init
const app = express();

// Middleware
app.use(
 helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware to intercept all requests
app.use((req, res, next) => {
 // Modify the response body or perform any other actions
 console.log(`Intercepted request: ${req.method} ${req.url}`);
 next(); 
});


// Routers
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/", indexRouter);
app.use("/users", usersRouter);

// Static html routes
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.get("/signup", (req, res) => {
 res.sendFile(path.join(__dirname, 'pages/sign-up.html'));
});

app.get("/apikey", (req, res) => {
 res.sendFile(path.join(__dirname, 'pages/api-key.html'));
});

// Testing redirects
app.get("/from", (req, res) => {
  setTimeout(() => {
    res.redirect("to");
  }, 1000);
});

app.get("/to", (req, res) => {
  res.status(200).json({
    message: "redirect working",
  });
});

// Express App
app.listen(config.PORT, () => {
  console.log(`App running on port http://localhost:${config.PORT}`);
});
