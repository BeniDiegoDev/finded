const mongoose = require("mongoose");

const dispoDateSchema = mongoose.Schema({
  date : Date,
});

const nonDispoDateSchema = mongoose.Schema({
  date: Date,
});

const reservSchema = mongoose.Schema({
  dispodate: dispoDateSchema,
  nondispodate : nonDispoDateSchema,
});

const prestaSchema = mongoose.Schema({
  name: String,
  price: Number
});

const feedbackSchema = mongoose.Schema({
  date: Date,
  username: String,
  note: Number,
  commentaire: String,
});

const professionalSchema = new mongoose.Schema({
  images: {},
  name: String,
  email: String,
  password: String,
  description: String,
  address: String,
  zipcode: String,
  city: String,
  phoneNumber: String,
  prestation: prestaSchema,
  category: String,
  feedback: feedbackSchema,
  reservations: reservSchema,
  isAvailable: Boolean
});

const professionalModel = mongoose.model("professionals", professionalSchema);
module.exports = professionalModel;
