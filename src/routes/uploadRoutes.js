const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Path: /api/v1/upload
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/src/uploads"));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file);
    console.log(file);
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname + extension);
  },
});

const upload = multer({ storage: storage });

// Path: /api/v1/upload
router.post("/upload", upload.single("file"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Access the file via req.file
  console.log(req.file);
  res.send("File uploaded successfully.");

  // Image and file transformations go here.

  // Database pushes go here.

  // Deleting temporary images and files goes here.
});

router.get("/upload", (req, res) => {
  res.status(200).json({
    message: "Image.",
  });
});

module.exports = router;
