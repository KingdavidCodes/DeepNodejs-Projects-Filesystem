const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//* @desc Register user contact
//* @route POST /api/users/register
//* access public
const registerUser = asyncHandler(async(req, res) => {
  const {username, email, password} = req.body;
  if(!username || !email || !password){
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // * check if user already available in the database
  const userAvailable = await User.findOne({ email });
  if(userAvailable){
    res.status(400);
    throw new Error("User already registerd");
  }

  // * hash password it returns a promise so we use asyncawait to handle the promise
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("User hashed password: ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });
  if(user){
    res.status(201).json({
      _id: user.id,
      email: user.email
    });
  }else {
    res.status(400)
    throw new Error("User not valid")
  }
});

//* @desc Login user user
//* @route POST /api/users/login
//* access public
const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;
  if(!email, !password){
    res.status(400);
    throw new Error("All fields are mandatory")
  }

  // * check if user is in database
  const user = await User.findOne({ email });
  const { username, email:userEmail, _id:userID } = user;

  if(user && (await bcrypt.compare(password, user.password))){
    // * generate a access token the user can use to Login
    const accessToken = jwt.sign({
      user: {
        username: username,
        email: userEmail,
        id: userID
      }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m"});
    res.status(200).json(accessToken);

  }else {
    res.status(400);
    throw new Error("email or password is not valid")
  }

});

//* @desc Current user contact
//* @route POST /api/users/current
//* access private
const currentUser = asyncHandler(async(req, res) => {
  res.status(200).json(req.user);
});


module.exports = {
  registerUser,
  loginUser,
  currentUser
}