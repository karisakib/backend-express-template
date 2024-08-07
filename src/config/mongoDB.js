require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongoDB = async () => {
 try {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("Connection to MongoDB successful."))
    .catch((error) => console.log(error));
  
 } catch (error) {
  console.log(error);
 }
}

connectToMongoDB();