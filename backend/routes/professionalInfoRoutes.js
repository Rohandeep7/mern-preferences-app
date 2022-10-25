const express = require("express");
const {
  getProfData,
  setProfData,
  updateProfData,
  deleteProfData
} = require("../controllers/professionalInfoController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getProfData).post(protect, setProfData);

router
  .route("/:id")
  .put(protect, updateProfData)
  .delete(protect, deleteProfData);

module.exports = router;
