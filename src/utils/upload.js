const multer = require("multer");
const path = require("path");
const fs = require("fs");


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

module.exports = upload;