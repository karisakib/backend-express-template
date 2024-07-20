const nodemailer = require("nodemailer");

const { EMAIL_AUTH_EMAIL, EMAIL_AUTH_PASSWORD } = process.env;

// https://www.suprsend.com/post/how-to-send-transactional-emails-with-brevo-formerly-sendinblue-api-in-node-js-w-codes-and-examples

let transporter = nodemailer.createTransport({
  name: "smtp-relay.brevo.com",
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_AUTH_EMAIL, // generated ethereal user
    pass: EMAIL_AUTH_PASSWORD, // generated ethereal password
  },
  logger: true,
  // debug: true,
});

// Test transporter
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(`Ready for message`);
//     console.log(success);
//   }
// });

const sendMail = async (mailOptions) => {
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    return info;
  } catch (error) {
    console.error("Error in sendMail function:", error);
    throw error;
  }
};

module.exports = sendMail;
