const mongoose = require("mongoose");

const personalPrefSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    foods: [{ text: String }],
    places: [{ text: String }],
    movies: [{ text: String }],
    hobbies: [{ text: String }],
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
