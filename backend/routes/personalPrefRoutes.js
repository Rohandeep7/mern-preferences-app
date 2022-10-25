const express = require("express");

const {
  getPreferences,
  setPreferences,
  updatePreference,
  deletePreference,
} = require("../controllers/preferencesController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getPreferences).post(protect, setPreferences);

router.route("/:id").put(protect, updatePreference).delete(protect, deletePreference);

module.exports = router;
