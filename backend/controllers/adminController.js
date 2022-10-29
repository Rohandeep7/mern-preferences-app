const Admin = require("../models/adminModel");
const Pref = require("../models/personalPrefModel");
const Prof = require("../models/professionalInfoModel");
const asyncHandler = require("express-async-handler");

const ADMIN_EMAIL = "ronnddy7@gmail.com";
const ADMIN_PWD = "12345";
const getPreferences = asyncHandler(async (req, res) => {
  const {
    tab,
    skill,
    experience,
    social,
    certifications,
    qualification,
    role,
    cuisine,
    hobby,
    place,
    language,
    shirtSize,
    height,
  } = req.body;

  let prof;
  if (tab === "professional") {
    prof = await Prof.find({
      "skills.text": skill,
      "experience.text": experience,
      "socials.text": social,
      "certifications.text": certifications,
      qualification: qualification,
      role: role,
    }).populate("user", "name email");
  } else {
    if(height){
      prof = await Pref.find({
      "cuisines.text": cuisine,
      "hobbies.text": hobby,
      "places.text": place,
      "languages.text": language,
      shirtSize: shirtSize,
      height : { $gte : height}
    }).populate("user", "name email");
    }
    else{
      prof = await Pref.find({
        "cuisines.text": cuisine,
        "hobbies.text": hobby,
        "places.text": place,
        "languages.text": language,
        shirtSize: shirtSize,
      }).populate("user", "name email");
    }
    
  }

  res.status(200).json(prof);
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the text fields");
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PWD) {
    res.status(400);
    throw new Error("Invalid Admin Credentials");
  }

  res.status(200).json({ message: "Successful Admin Login", name: "Admin" });
});

module.exports = {
  getPreferences,
  loginAdmin,
};
