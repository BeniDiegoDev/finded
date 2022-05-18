const mongoose = require('mongoose')

const prestaSchema = new mongoose.Schema({
    name: String,
    prix: Number,
})

const prestatairesSchema = mongoose.Schema({
    images: String,
    name: String,
    email: String,
    description: String,
    number: String,
    address: String,
    zipcode: String,
    city: String,
    phoneNumber: String,
    prestation: prestaSchema,
    category: String,
    categoryName: String,
    // feedback: feedbackSchema,
    // reservations: reservSchema,
    // isAvailable: Boolean,
    note: Number,
    nbeval: Number,
})

const prestatairesModel = mongoose.model('prestataires', prestatairesSchema)

module.exports = prestatairesModel