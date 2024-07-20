const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // Defaulted userId: Date.now() + UUIDv4 striped of dashes, but dash between date and uuid.
    //  userId: {
    //   type: String,
    //   required: true,
    // },
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
    // This token is a JWT.
    token: {
      type: String,
      default: ''
      // required: true,
    }
  },
  { timestamps: true },
  { collection: "users" },
  { versionKey: false }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
