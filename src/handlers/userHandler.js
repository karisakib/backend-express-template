const UserModel = require("../models/userModel");
const createToken = require("../utils/createToken");
const {verifyHashedData} = require("../utils/hashData")

const createNewUser = async (data) => {
 try {
  let { firstName, lastName, email, password } = data;
  if (!firstName || !lastName || !email || !password) {
   throw Error("All fields are required.")
  }
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();

  // Check if user already exists in database
  const existingUser = await UserModel.findOne({email});

  if (existingUser) {
   throw Error(`User already exists with email ${email}.`)
  }

  // Hash password and store into DB along with other required data.

 } catch (error) {
  throw Error("There's been an error creating new user.")
 }
}

const authenticateUser = async (data) => {
 try {
  let { email, password } = data;
  if (!email || !password) {
   throw Error("All fields are required.")
  }
  email = email.trim();
  password = password.trim();

  // Check if user already exists in database
  const fetchedUser = await UserModel.findOne({email});

  if (!fetchedUser) {
   throw Error(`User with email ${email} does not exist.`)
  }

  // Verify hashed password
  const hashedPassword = fetchedUser.hashedPassword;

  const passwordMatch = verifyHashedData(password, hashedPassword);
  if (!passwordMatch) {
   throw Error(`Invalid password.`)
  }

  // Create user token
  const tokenData = {
   userId: fetchedUser._id,
   email: fetchedUser.email
  }

  const token = await createToken(tokenData)

  // Assign user token
  // await UserModel.updateOne({ _id: fetchedUser._id },{ token: token }); // This method works directly on the model
  fetchedUser.token = token // Works on document instances
  await fetchedUser.save()
  
  // Return user data
  return fetchedUser;

 } catch (error) {
  throw Error("There was an error authenticating user. Check the authenticateUser function in userHandler.js")
 }
}

module.exports = {
 createNewUser,
 authenticateUser
}