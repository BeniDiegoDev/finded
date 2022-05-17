const mongoose = require('mongoose')

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
    // prestation: prestaSchema,
    category: String,
    // feedback: feedbackSchema,
    // reservations: reservSchema,
    // isAvailable: Boolean
})

const prestatairesModel = mongoose.model('prestataires', prestatairesSchema)

module.exports = prestatairesModel