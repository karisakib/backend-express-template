require("dotenv").config();
const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

const BgGreen = "\x1b[42m"
const Reset = "\x1b[0m"

const connectToMongoDB = async () => {
 try {
  await mongoose
  .connect(MONGODB_URL)
  .then(console.log(`${BgGreen} MongoDB: Connected ${Reset}`))
 } catch (error) {
  console.log(error);
 }
}

connectToMongoDB();