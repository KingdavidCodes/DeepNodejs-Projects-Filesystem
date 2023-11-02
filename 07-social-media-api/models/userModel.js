const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please input first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please input last name"]
  },
  email: {
    type: String,
    required: [true, "Please input email address"],
    unique: [true, "Email address taken"]
  },
  password: {
    type: String,
    required: [true, "Please input password"]
  }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);

