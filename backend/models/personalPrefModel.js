const mongoose = require("mongoose");

const personalPrefSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    foods: {
      type: [{ text: String }],
      default: [],
    },
    places: {
      type: [{ text: String }],
      default: [],
    },
    movies: {
      type: [{ text: String }],
      default: [],
    },
    hobbies: {
      type: [{ text: String }],
      default: [],
    },
    height: {
      type: String,
      default: "",
    },
    shirtSize: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PersonalPref", personalPrefSchema);
