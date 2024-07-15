const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApiKeySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: false,
    },
    apikey: {
      type: String,
      // required: true,
      unique: true,
    },
  },
  { timestamps: true },
  { collection: "apikeys" },
  { versionKey: false }
);

const ApiKeyModel = mongoose.model("ApiKey", ApiKeySchema);

module.exports = ApiKeyModel;
