const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OTPSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: false,
    },
    otp: {
      type: String,
      createdAt: Date,
      expiresAt: Date
    },
  },
  {
    collection: "otp",
  },
  { versionKey: false }
);

const OTPModel = mongoose.model("OTP", OTPSchema);

module.exports = OTPModel;
