const express = require('express');
const apiRouter = express.Router();

// Import your API routes
const authRoutes = require('./v1/auth');
const otpRoutes = require('./v1/otp');
const userRoutes = require('./v1/users');

// Prefix routes with /v1
apiRouter.use('/v1/auth', authRoutes);
apiRouter.use('/v1/otp', otpRoutes);
apiRouter.use('/v1/users', userRoutes);

module.exports = apiRouter;
