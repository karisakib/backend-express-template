const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  },
  { versionKey: false }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
