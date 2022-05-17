const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  number: String,
  street: String,
  ZIP: String,
  city: String,
});
const creditSchema = mongoose.Schema({
  name: String,
  numbers: String,
  date: Date,
  CVV: String,
});
const reservSchema = mongoose.Schema({
  date: Date,
});
const messagesSchema = mongoose.Schema({
  date: Date,
  content: String,
});
const conversSchema = mongoose.Schema({
  messageList: String,
});
///////////////////////////////////////////
const userSchema = new mongoose.Schema({
  accountType: String,
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

  creditCard: {
    type: String,
    required: false,
    unique: true,
    minLength: 16,
    maxLength: 16,
  },
  address: addressSchema,
  creditCard: creditSchema,
  reservations: reservSchema,
  messages: messagesSchema,
  conversations: conversSchema,
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
