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
var reservSchema = mongoose.Schema({
  date: String,
  horaire: String,
  prix: String,
  name: String,
  status: String,
  prestations: Array,
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
  token: String,
  accountType: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: addressSchema,
  creditCard: creditSchema,
  reservations: [reservSchema],
  messages: messagesSchema,
  conversations: conversSchema,
  phoneNumber: String,
  profilePicture: String,
  note: String,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
