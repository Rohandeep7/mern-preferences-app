const asyncHandler=require('express-async-handler')
const Goal=require('../models/goalModel')
const User=require('../models/userModel')
const getGoals=asyncHandler(async (req,res)=>{

    const goal = await Goal.find({ user: req.user.id });
    res.status(200).json(goal)
})

const setGoal=asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(404)
        throw Error('Please add a text field')
    }
    const goal=await Goal.create({
        user:req.user.id,
        text:req.body.text
    })
    res.status(201).json(goal);
})

const updateGoal=asyncHandler(async (req,res)=>{

    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400).json({message:'Goal not found'})
        throw new Error('Goal not found')
    }

    const user=await User.findById(req.user.id)

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    if(goal.user.toString()!==user.id){
        res.status(400)
        throw new Error('User not authorized')
    }

    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).json({ message: "Goal not found" });
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  const deletedGoal = await Goal.findByIdAndRemove(req.params.id);

  res.status(200).json(deletedGoal);
});

module.exports={getGoals,setGoal,updateGoal,deleteGoal}