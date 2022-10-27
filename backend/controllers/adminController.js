const Admin=require('../models/adminModel')
const Pref=require('../models/personalPrefModel')
const Prof=require('../models/professionalInfoModel')
const asyncHandler=require('express-async-handler')

const getPreferences=asyncHandler(async (req,res)=>{
  const {tab,skill,experience,social,certifications,qualification,role,cuisine,hobby,place,language,shirtSize,height}=req.body
  console.log(req.body);
  let prof;
  if(tab==='professional'){
     prof=await Prof.find({ "skills.text":  skill,"experience.text":experience, "socials.text":social,"certifications.text":certifications,qualification:qualification,role:role}).populate('user','name email')
  }
  else{
    prof=await Pref.find({ "cuisine.text": cuisine,"hobbies.text":hobby, "places.text":place,"languages.text":language,shirtSize:shirtSize,height:height}).populate('user','name email')
  }

  // , "experience.text":experience, "socials.text":social,"certifications.text":certifications,qualification:qualification,role:role 

  console.log('hi');
  res.status(200).json(prof)
  
})

module.exports={
  getPreferences
}