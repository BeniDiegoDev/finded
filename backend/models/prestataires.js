const mongoose = require('mongoose')

<<<<<<< HEAD


=======
>>>>>>> 7116b08ef600719f59a4eabb6b951247736d7412
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
    // reservations: Array,
    // isAvailable: Boolean,
    note: Number,
    nbeval: Number,
    tags: Array,
})

const prestatairesModel = mongoose.model('prestataires', prestatairesSchema)

module.exports = prestatairesModel