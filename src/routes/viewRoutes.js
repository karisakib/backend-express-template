const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("pages/index");
  // Do not include the EJS file extension
});

router.get("/about", (req, res) => {
  const dummyData = { look: "here" };
  res.status(200).render("pages/about", { dummyData });
  // Do not include the EJS file extension
});

router.get("/overview", (req, res) => {
  res.status(200).render("pages/overview");
  // Do not include the EJS file extension
});

router.get("/quickstart", (req, res) => {
  res.status(200).render("pages/quickstart");
  // Do not include the EJS file extension
});

router.get("/file-upload", (req, res) => {
  res.status(200).render("pages/file-upload");
  // Do not include the EJS file extension
});

router.get("/installation", (req, res) => {
  res.status(200).render("pages/installation");
  // Do not include the EJS file extension
});

router.get("/reference", (req, res) => {
  res.status(200).render("pages/reference");
  // Do not include the EJS file extension
});

router.get("/security", (req, res) => {
  res.status(200).render("pages/security");
  // Do not include the EJS file extension
});

router.get("/setup", (req, res) => {
  res.status(200).render("pages/setup");
  // Do not include the EJS file extension
});

router.get("/best-practices", (req, res) => {
  res.status(200).render("pages/best-practices");
  // Do not include the EJS file extension
});

/**
 * Dynamically rendering template engine pages
 */

// Read the JSON file containing the EJS file names
// const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf-8')).pages;

// Dynamically create routes for each EJS file name
// pages.forEach(page => {
//   router.route(`/${page}`)
//     .get((req, res) => {
//       res.render(page);
//     });
// });

// router.get("/", (req, res) => {
//  res.sendFile(path.join(process.cwd(), "src/static/index.html"));
// });

/**
 * HTML file rendering
 */
router.get("/tests", (req, res) => {
  res.sendFile(path.join(process.cwd(), "__reports__/index.html"));
});

module.exports = router;
