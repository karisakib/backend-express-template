const jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["X-Access-Token"];

  if (!token) {
    return res.status(403).send("An authentication token is required.");
  }

  // Verify token

  try {
   const decodedToken = jwt.decode(token, JWT_KEY);
   req.currentUser = decodedToken;
  } catch (error) {
   return res.status(401).send("Invalid token provided.");

  }

  // Proceed with request
  return next();
};

module.exports = verifyToken;