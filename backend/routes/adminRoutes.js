const express = require("express");

const {
  getPreferences,
} = require("../controllers/adminController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();



router.route("/search").post(getPreferences)

module.exports = router;