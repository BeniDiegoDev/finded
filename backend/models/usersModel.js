const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  number: String,
  street: String,
  ZIP: String,
  city: String,
});
const reservSchema = mongoose.Schema({
  date: Date,
});
const messageSchema = mongoose.Schema({
  username: String,
  date: Date,
  content: String,
});
const conversSchema = mongoose.Schema({
  messageList: String,
});
const cbSchema = mongoose.Schema({
  name: String,
  numbers: String,
  date: Date,
  CVV: String,
});

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
  creditCard: {
    type: String,
    required: false,
    unique: true,
    minLength: 16,
  },
  address: addressSchema,
  reservations: reservSchema,
  messages: messageSchema,
  conversations: conversSchema,
  creditCard: cbSchema,
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
