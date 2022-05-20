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
  price: Number,
  prestataires: { type: mongoose.Schema.Types.ObjectId, ref: "prestataires" },

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

  creditCard: {
    type: String,
    required: false,
    minLength: 16,
    maxLength: 16,
  },
  address: addressSchema,
  // creditCard: creditSchema,
  reservations: reservSchema,
  // messages: messagesSchema,
  // conversations: conversSchema,
  phoneNumber: String,
  profilePicture: String,
  note: String,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
