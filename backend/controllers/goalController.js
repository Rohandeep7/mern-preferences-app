const asyncHandler=require('express-async-handler')

const getGoals=asyncHandler(async (req,res)=>{
    res.status(200).json({message:'Get Goals'})
})

const setGoal=asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(404)
        throw Error('Please add a text field')
    }
    else{
        console.log(req.body.text);
    }
    res.status(201).json({ message: "Set Goal" });
})

const updateGoal=asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Update Goal ${req.params.id}`})
})

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports={getGoals,setGoal,updateGoal,deleteGoal}