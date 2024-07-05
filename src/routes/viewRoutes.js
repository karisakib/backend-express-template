const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
 res.status(200).render('pages/index');
 // Do not include the EJS file extension
});

router.get('/about', (req, res) => {
 res.status(200).render('pages/about');
 // Do not include the EJS file extension
});

router.get('/overview', (req, res) => {
 res.status(200).render('pages/overview');
 // Do not include the EJS file extension
});

router.get('/quickstart', (req, res) => {
 res.status(200).render('pages/quickstart');
 // Do not include the EJS file extension
});

router.get('/installation', (req, res) => {
 res.status(200).render('pages/installation');
 // Do not include the EJS file extension
});

router.get('/reference', (req, res) => {
 res.status(200).render('pages/reference');
 // Do not include the EJS file extension
});

router.get('/security', (req, res) => {
 res.status(200).render('pages/security');
 // Do not include the EJS file extension
});

router.get('/setup', (req, res) => {
 res.status(200).render('pages/setup');
 // Do not include the EJS file extension
});

router.get('/best-practices', (req, res) => {
 res.status(200).render('pages/best-practices');
 // Do not include the EJS file extension
});





// router.get("/", (req, res) => {
//  res.sendFile(path.join(process.cwd(), "src/static/index.html"));
// });

router.get("/tests", (req, res) => {
res.sendFile(path.join(process.cwd(), "__reports__/index.html"));
});

router.get("/signup", (req, res) => {
 res.sendFile(path.join(process.cwd(), "src/static/sign-up.html"));
});

router.get("/reset", (req, res) => {
 res.sendFile(path.join(process.cwd(), "src/static/pwd-reset.html"));
});

router.get("/apikey", (req, res) => {
 res.sendFile(path.join(process.cwd(), "src/static/api-key.html"));
});

module.exports = router;
