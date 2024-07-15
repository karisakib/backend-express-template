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
    },
    expireAt: {
     type: Date,
     default: Date.now,
     expires: 60*5, // Expires in 5 minutes
   },
  },
  { timestamps: true },
  { collection: "otp" },
  { versionKey: false },
);

const OTPModel = mongoose.model("OTP", OTPSchema);

module.exports = OTPModel;
