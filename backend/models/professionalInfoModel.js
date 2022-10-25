const mongoose = require("mongoose");

const professionalInfoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    techStack: [{ text: String }],
    qualification: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("professionalinfo", professionalInfoSchema);