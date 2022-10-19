const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");
const router = express.Router();

router.post('/register',registerUser)

router.post("/login",loginUser);

router.get('/getMe',getUserDetails)

module.exports = router
