const asyncHandler = require("express-async-handler");
const Pref = require("../models/personalPrefModel");
const User = require("../models/userModel");
const getPreferences = asyncHandler(async (req, res) => {
  const pref = await Pref.find({ user: req.user.id });
  res.status(200).json(pref);
});

const setPreferences = asyncHandler(async (req, res) => {
  const { type, text } = req.body;
  if (!req.body.text) {
    res.status(404);
    throw Error("Please add a text field");
  }
  let pref;
  let query = {
    user: req.user.id,
  };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };

  if (type === "foods" || type==="hobbies" || type==="movies" || type==="places") {
    const newItem = { text };

    pref = await Pref.findOneAndUpdate(
      query,
      { $push: { [type]: newItem } },
      options
    );
  } else if (type === "shirtSize" || type==="height") {
    let update = { [type]: text };

    pref = await Pref.findOneAndUpdate(query, update, options);
  }

  res.status(201).json(pref);
});

const updatePreference = asyncHandler(async (req, res) => {
  const { type, text } = req.body;
  let pref;
  if(type==='foods' || type==='hobbies' || type==='movies' || type==='places'){
        pref = await Pref.findOne({ [`${type}._id`]: req.params.id });
  }
  else if(type==='shirtSize' || type==='height'){
        pref=await Pref.findById(req.params.id)
  }
  
  if (!pref) {
    res.status(400);
    throw new Error("Data not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (pref.user.toString() !== user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  let updatedPref;
  if(type==='foods' || type==='hobbies' || type==='movies' || type==='places'){
    updatedPref = await Pref.findOneAndUpdate(
      { user: req.user.id, [`${type}._id`]: req.params.id },
      {
        $set: {
          [`${type}.$.text`]: text,
        },
      }
    );
  }
  else if(type==='shirtSize' || type==='height'){
    updatedPref=await Pref.findOneAndUpdate({user:req.user.id},{$set : {[type]:text}})
  }
  

  res.status(200).json(updatedPref);
});

const deletePreference = asyncHandler(async (req, res) => {
  const { type} = req.body;
  let pref;
  if (
    type === "foods" ||
    type === "hobbies" ||
    type === "movies" ||
    type === "places"
  ) {
    pref = await Pref.findOne({ [`${type}._id`]: req.params.id });
  } else if (type === "shirtSize" || type === "height") {
    pref = await Pref.findById(req.params.id);
  }

  if (!pref) {
    res.status(400);
    throw new Error("Data not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (pref.user.toString() !== user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  // const deletedPref = await Pref.findOneAndUpdate(
  //   query,
  //   { $pull: { foods: { _id: req.params.id } } },
  //   options
  // );
  
  let deletedPref;
  if (
    type === "foods" ||
    type === "hobbies" ||
    type === "movies" ||
    type === "places"
  ) {
    deletedPref = await Pref.findOneAndUpdate(
      { user: req.user.id, [`${type}._id`]: req.params.id },
      { $pull: { [type]: { _id: req.params.id } } }
    );
  } else if (type === "shirtSize" || type === "height") {
    deletedPref = await Pref.findOneAndUpdate(
      { user: req.user.id },
      { $set: { [type]: '' } }
    );
  }

  res.status(200).json(deletedPref);
});

// const deletedPref = await Pref.findOneAndUpdate(
//   query,
//   { $pull: { foods: { _id: req.params.id } } },
//   options
// );

module.exports = {
  getPreferences,
  setPreferences,
  updatePreference,
  deletePreference,
};
