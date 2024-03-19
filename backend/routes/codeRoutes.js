const express = require("express");
const codeController = require("../controllers/codeController");

const router = express.Router();

router.post("/submit", codeController.submitCode);
router.get("/submissions", codeController.getSubmissions);
router.post("/compile", codeController.compile);

module.exports = router;
