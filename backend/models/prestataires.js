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
    prestation: Array,
    category: String,
    categoryName: String,
    feedback: Array,
    // reservations: reservSchema,
    // isAvailable: Boolean,
    note: Number,
    nbeval: Number,
    lat: Number,
    lon: Number,
})

const prestatairesModel = mongoose.model('prestataires', prestatairesSchema)

module.exports = prestatairesModel