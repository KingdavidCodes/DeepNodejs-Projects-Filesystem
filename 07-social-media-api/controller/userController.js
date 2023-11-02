const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const registerUser = asyncHandler( async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const validEmail = await emailValidator.validate(email); // * validate email returns a Boolean

  if(!firstName || !lastName || !email || !password){
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  if(!validEmail){
    res.status(400);
    throw new Error('Please add a valid email address');
  }

  const alreadyRegisterd = await User.findOne({ email });
  if(alreadyRegisterd){
    res.status(400);
    throw new Error('User already registerd');
  }


  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  }else {
    res.status(400);
    throw new Error('User not valid');
  }
});


const loginUser = asyncHandler( async (req, res) => {
  const {email, password } = req.body;
  const validEmail = await emailValidator.validate(email); // * validate email returns a Boolean

  if(!email || !password){
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  if(!validEmail){
    res.status(400);
    throw new Error('Please add a valid email address');
  }

  //* getting registerd user from database
  const registerUser = await User.findOne({ email });
  if(!registerUser){
    res.status(400);
    throw new Error('No registerd user found');
  }
  const { _id: registerdID, firstName, lastName, email: registerdEmail, password: registerdPassword } = registerUser;
  

  if(email && (await bcrypt.compare(password, registerdPassword))){
    const accessToken = jwt.sign({
      user: {
        id: registerdID,
        firstName,
        lastName,
        email: registerdEmail
      }
    }, process.env.ACCESS_TOKEN, { expiresIn: '15m'});
    res.status(200).json(accessToken);
  }else {
    res.status(400);
    throw new Error("email or password is not valid")
  }
});

const currentUser = asyncHandler( async (req, res) => {
  res.status(200).json(req.user);
});



module.exports = {
  registerUser,
  loginUser,
  currentUser
}