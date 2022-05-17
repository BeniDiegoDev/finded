var express = require('express');
var router = express.Router();

// Import du cryptage des mots de passe
// var uid2 = require('uid2')
// var bcrypt = require('bcrypt');

var prestatairesModel = require('../models/prestataires')

// Force fake upload préstataire
router.post('/importpresta', async function (req, res, next) {

  var newPrestataire = new prestatairesModel({
    images: '../assets/fakeminia/miniatest2.jpg',
    name: 'Controle technique Fiacre',
    email: 'ctdescartese@gmail.com',
    description: 'Controle technique pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
    number: '25',
    address: 'rue du fiacre',
    zipcode: '75010',
    city: 'Paris',
    phoneNumber: '0161416014',
    category: 'mechanic'
  });

  console.log(newPrestataire)

  var prestatairesSave = await newPrestataire.save();

  res.json({prestatairesSave});
});

// Force récupération des données
router.get('/recuppresta', async function (req, res, next) {

  var prestataires = await prestatairesModel.find();

  res.json({prestataires})
});

module.exports = router;
