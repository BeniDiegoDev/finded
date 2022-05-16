const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
images: {},
name: String,
description: String,
adress: String,
prestation: String,
category: String,
feedback: String,
reservations: String,
isAvailable: Boolean
});

const professionalModel = mongoose.model("professionals", professionalSchema);
module.exports = professionalModel;
