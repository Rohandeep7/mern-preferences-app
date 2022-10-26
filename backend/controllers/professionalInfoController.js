const asyncHandler = require("express-async-handler");
const Prof = require("../models/professionalInfoModel");
const User = require("../models/userModel");
const getProfData = asyncHandler(async (req, res) => {
  let prof = await Prof.find({ user: req.user.id });
  if(!prof){
    console.log('hello')
    prof = await Prof.create({ user: req.user.id });
  }
  res.status(200).json(prof);
});

const setProfData = asyncHandler(async (req, res) => {
  const { type, text } = req.body;
  if (!req.body.text) {
    res.status(404);
    throw Error("Please add a text field");
  }
  let prof;
  let query = {
    user: req.user.id,
  };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };

  if (type === "skills" || type==="experience" || type==="certifications" || type==="links") {
    const newItem = { text };

    prof = await Prof.findOneAndUpdate(
      query,
      { $push: { [type]: newItem } },
      options
    );
  } else if (type === "role" || type==="qualification") {
    let update = { [type]: text };

    prof = await Prof.findOneAndUpdate(query, update, options);
  }

  res.status(201).json(prof);
});

const updateProfData = asyncHandler(async (req, res) => {
  const { type, text } = req.body;
  let prof;
  if (type === "skills" || type==="experience" || type==="certifications" || type==="links"){
        prof = await Prof.findOne({ [`${type}._id`]: req.params.id });
  }
  else if (type === "role" || type==="qualification"){
        prof=await Prof.findById(req.params.id)
  }
  
  if (!prof) {
    res.status(400);
    throw new Error("Data not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (prof.user.toString() !== user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  let updatedProf;
  if (type === "skills" || type==="experience" || type==="certifications" || type==="links"){
    updatedProf = await Prof.findOneAndUpdate(
      { user: req.user.id, [`${type}._id`]: req.params.id },
      {
        $set: {
          [`${type}.$.text`]: text,
        },
      }
    );
  }
  else if (type === "role" || type==="qualification"){
    updatedProf=await Prof.updateOne({user:req.user.id},{[type]:text})
  }
  
  const updatedData=await Prof.findOne({user:req.user.id})

  res.status(200).json(updatedData);
});

const deleteProfData= asyncHandler(async (req, res) => {
  const { type} = req.body;
  let pref;
  if (type === "skills" || type==="experience" || type==="certifications" || type==="links") {
    prof = await Prof.findOne({ [`${type}._id`]: req.params.id });
  } else if (type === "role" || type==="qualification") {
    prof = await Prof.findById(req.params.id);
  }

  if (!prof) {
    res.status(400);
    throw new Error("Data not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (prof.user.toString() !== user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  // const deletedPref = await Pref.findOneAndUpdate(
  //   query,
  //   { $pull: { foods: { _id: req.params.id } } },
  //   options
  // );
  
  let deletedProf;
  if (type === "skills" || type==="experience" || type==="certifications" || type==="links") {
    deletedProf = await Prof.updateOne(
      { user: req.user.id, [`${type}._id`]: req.params.id },
      { $pull: { [type]: { _id: req.params.id } } }
    );
  } else if (type === "role" || type==="qualification") {
    deletedProf = await Prof.findOneAndUpdate(
      { user: req.user.id },
      { $set: { [type]: '' } }
    );
  }

  const updatedData=await Prof.findOne({user:req.user._id})
  res.status(200).json(updatedData);
});

module.exports = {
  getProfData,
  setProfData,
  updateProfData,
  deleteProfData,
};

