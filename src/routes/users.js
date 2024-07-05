var express = require('express');
var router = express.Router();

// const ApiKeyModel = require("./models/apiKeyModel");
const UserModel = require("../models/userModel");

router.get("/all", async (req, res) => {
 try {
   const documents = await UserModel.find({});
   res.status(201).json(documents);
 } catch (err) {
   res.status(400).json({ error: err.message });
 }
});

router.get("/:id", async (req, res) => {
 try {
  const id = req.params.id;
   res.status(200).json({"params":id});
 } catch (err) {
   res.status(400).json({ error: err.message });
 }
});

module.exports = router;
