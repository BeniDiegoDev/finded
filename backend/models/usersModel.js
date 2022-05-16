// const mongoose = require('mongoose')

// const userSchema = mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true}
// })

// const userModel = mongoose.model('users', userSchema)

// module.exports = userModel

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  accountType: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  creditCard: {
    type: String,
    required: false,
    unique: true,
    minLength: 16,
  },
  reservations: {
  },
  messages: {
  },
  conversations: {
  },
  phoneNumber: {
    type: String,
    required: false,
    minLength: 10,
    unique: true,
  },
  profilePicture: String,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
