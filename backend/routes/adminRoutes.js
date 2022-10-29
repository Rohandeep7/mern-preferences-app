const express = require("express");

const {
  getPreferences,
  loginAdmin
} = require("../controllers/adminController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();



router.route("/search").post(getPreferences)
router.route("/login").post(loginAdmin)

module.exports = router;