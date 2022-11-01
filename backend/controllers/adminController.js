const Pref = require("../models/personalPrefModel");
const Prof = require("../models/professionalInfoModel");
const asyncHandler = require("express-async-handler");


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

    const query = [{}];
    skill && query.push({ "skills.text": { $all: skill } });
    experience && query.push({ "experience.text": { $all: experience } });
    social && query.push({ "socials.text": { $all: social } });
    certifications &&
      query.push({ "certifications.text": { $all: certifications } });
    role && query.push({ role: role });
    qualification && query.push({ qualification: qualification });

    prof = await Prof.find({ $and: query }).populate("user", "name email");

  } else {

    const query=[{}]
    cuisine && query.push({ "cuisines.text": { $all: cuisine } });
    hobby && query.push({ "hobbies.text": { $all: hobby } });
    place && query.push({ "places.text": { $all: place } });
    language && query.push({ "languages.text": { $all: language } });
    shirtSize && query.push({ shirtSize: shirtSize });
    height && query.push({ height: { $gte: height } });
    
    prof = await Pref.find({ $and: query }).populate("user", "name email");
    
  }

  res.status(200).json(prof);
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the text fields");
  }

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PWD) {
    res.status(400);
    throw new Error("Invalid Admin Credentials");
  }

  res.status(200).json({ message: "Successful Admin Login", name: "Admin" });
});

module.exports = {
  getPreferences,
  loginAdmin,
};
