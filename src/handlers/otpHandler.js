const OTPModel = require("../models/otpModel");
const { hashData } = require("../utils/hashData");
const sendEmail = require("../utils/sendEmail");
const generateOTP = require("../utils/generateOTP");

const { EMAIL_AUTH_EMAIL } = process.env;

const sendOTP = async ({ email, subject, message, duration = 5 }) => {
  try {
    if (!email || !subject || !message) {
      throw Error(`Provide value for email, subject, and message.`);
    }

    // Clear any old record
    await OTPModel.deleteOne({ email });

    // Generate OTP
    const generatedOTP = await generateOTP();

    // Send email
    const mailOptions = {
      from: EMAIL_AUTH_EMAIL,
      to: email,
      subject: subject,
      html: `
        <p>${message}</p><br><br>
        <p style="color:red;font-size:36px;letter-spacing: 2px;">${generatedOTP}</p>
        <br><br><p>This code will expire in ${duration} minutes.</p>
      `,
    };

    // Send email
    const emailResponse = await sendEmail(mailOptions);
    console.log("Email response:", emailResponse);

    // Save the OTP in database
    const hashedOTP = await hashData(generatedOTP);
    const newOTP = new OTPModel({
      email: email,
      otp: hashedOTP,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw Error(`Error sending OTP. Check sendOTP function in otp.js file.`);
  }
};

module.exports = sendOTP;
