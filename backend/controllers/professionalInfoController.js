const asyncHandler = require("express-async-handler");
const Prof = require("../models/professionalInfoModel");
const User = require("../models/userModel");
const getProfData = asyncHandler(async (req, res) => {
  const prof = await Prof.find({ user: req.user.id });
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

  if (type === "techStack") {
    const newItem = { text };

    prof = await Prof.findOneAndUpdate(
      query,
      { $push: { techStack: newItem } },
      options
    );
  } else if (type === "qualification") {
    let update = { qualification : text };

    prof = await Prof.findOneAndUpdate(query, update, options);
  }

  res.status(201).json(prof);
});

const updateProfData = asyncHandler(async (req, res) => {
  const { type, text } = req.body;
  let prof;
  if (type === "techStack") {
    prof = await Prof.findOne({ "techStack._id": req.params.id });
  } else if (type === "qualification") {
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

  let updatedProf;
  if (type === "techStack") {
    updatedProf = await Prof.findOneAndUpdate(
      { user: req.user.id, "techStack._id": req.params.id },
      {
        $set: {
          "techStack.$.text": text,
        },
      }
    );
  } else if (type === "qualification") {
    updatedProf = await Prof.findOneAndUpdate(
      { user: req.user.id },
      { $set: { qualification: text } }
    );
  }

  res.status(200).json(updatedProf);
});

const deleteProfData= asyncHandler(async (req, res) => {
  let query = {
    user: req.user.id,
  };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const { type } = req.body;
  const prof = await Prof.findOne({ "techStack._id": req.params.id });
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

  const deletedProf = await Prof.findOneAndUpdate(
    query,
    { $pull: { techStack: { _id: req.params.id } } },
    options
  );

  res.status(200).json(deletedProf);
});

module.exports = {
  getProfData,
  setProfData,
  updateProfData,
  deleteProfData,
};

