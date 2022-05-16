const mongoose = require("mongoose");

const reservSchema = mongoose.Schema({
    date: Date,
  });

const professionalSchema = new mongoose.Schema({
images: {},
name: String,
email: String,
password: String,
description: String,
address: String,
phoneNumber: String,
prestation: String,
category: String,
feedback: String,
reservations: reservSchema,
isAvailable: Boolean
});

const professionalModel = mongoose.model("professionals", professionalSchema);
module.exports = professionalModel;
