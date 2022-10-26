const mongoose = require("mongoose");

const professionalInfoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    skills: {
      type: [{ text: String }],
      default: [],
    },
    experience: {
      type: [{ text: String }],
      default: [],
    },
    certifications: {
      type: [{ text: String }],
      default: [],
    },
    socials: {
      type: [{ text: String }],
      default: [],
    },
    role: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProfData", professionalInfoSchema);
