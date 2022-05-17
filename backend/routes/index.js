var express = require('express');
var router = express.Router();

// Import du cryptage des mots de passe
// var uid2 = require('uid2')
// var bcrypt = require('bcrypt');

var prestatairesModel = require('../models/prestataires')

// Force fake upload préstataire
router.post('/importpresta', async function (req, res, next) {

  var fakeTableau = [
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      name: 'CT Montparn',
      email: 'ctmontparn@gmail.com',
      description: 'Controle technique pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '15',
      address: 'avenue de montparnasse',
      zipcode: '75015',
      city: 'Paris',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.9,
      nbeval: 92
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest10_rtos46.jpg',
      name: 'Controle technique Fiacre',
      email: 'ctdufiacre@gmail.com',
      description: 'Controle technique pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '25',
      address: 'rue du fiacre',
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0161416014',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.5,
      nbeval: 34
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest8_vdxlfi.jpg',
      name: 'Controle technique Descartes',
      email: 'ctdescartese@gmail.com',
      description: 'CT pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '15',
      address: 'rue descartes',
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0166516014',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.8,
      nbeval: 244
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest9_fimsh8.jpg',
      name: 'CT La Fleche',
      email: 'ctlafleche@gmail.com',
      description: 'Controle technique pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '68',
      address: 'avenue des arts',
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.9,
      nbeval: 124
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest7_jodpum.jpg',
      name: 'Estheticienne Beauté',
      email: 'beauté@gmail.com',
      description: 'Estheticienne qualifié ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '47',
      address: 'avenue de la beauté',
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0171419845',
      category: 'relooking',
      categoryName: 'Maquillage',
      note: 4.9,
      nbeval: 322
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817649/FindedApp/miniatest13_cjgakt.jpg',
      name: 'Beauty People',
      email: 'beautyppl@gmail.com',
      description: 'Esthetique homme pas cher ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '98',
      address: 'rue du peuple',
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0171414121',
      category: 'relooking',
      categoryName: 'Maquillage',
      note: 4.8,
      nbeval: 145
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest6_miijlx.jpg',
      name: 'Beauty Foot',
      email: 'beautyfoot@gmail.com',
      description: 'Meilleur masseur du Moment à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '69',
      address: "rue de l'etan",
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0114578459',
      category: 'massage-des-pieds',
      categoryName: 'Pédicure',
      note: 4.7,
      nbeval: 35
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest3_aumalt.jpg',
      name: 'Baby Garden',
      email: 'babygarden@gmail.com',
      description: "Garde d'enfants à domicile ou dans notre centre ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '43',
      address: "rue de la lune",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0114758459',
      category: 'mother',
      categoryName: 'Baby-Sitting',
      note: 4.9,
      nbeval: 421
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817537/FindedApp/miniatest12_mkau8t.jpg',
      name: 'Baby Green',
      email: 'babygreen@gmail.com',
      description: "Garde d'enfants dans notre centre ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '16',
      address: "rue du soleil",
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0168878459',
      category: 'mother',
      categoryName: 'Baby-Sitting',
      note: 4.9,
      nbeval: 130
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest5_nnjibb.jpg',
      name: "Mass'Moi",
      email: 'massmoi@gmail.com',
      description: "Massage dans notre centre luxe à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '26',
      address: "rue du dome",
      zipcode: '75015',
      city: 'Paris',
      phoneNumber: '0147496754',
      category: 'massage',
      categoryName: 'Massage',
      note: 4.7,
      nbeval: 659
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817471/FindedApp/miniatest11_epcvzs.jpg',
      name: "Massage des Beauxjours",
      email: 'massagedbj@gmail.com',
      description: "Massage de qualité dans notre centre à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '99',
      address: "rue des beauxjours",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0141475754',
      category: 'massage',
      categoryName: 'Massage',
      note: 4.4,
      nbeval: 875
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest4_yoqnq9.jpg',
      name: "Deblok Serrurier",
      email: 'deblokserr@gmail.com',
      description: "Serrurier rapide se déplace à Paris ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '15',
      address: "boulevard du barillet",
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0141147854',
      category: 'trou-de-serrure',
      categoryName: 'Serrurier',
      note: 4.9,
      nbeval: 127
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817694/FindedApp/miniatest14_e0pfqz.jpg',
      name: "Serrurier du sentier",
      email: 'serrursent@gmail.com',
      description: "Serrurier rapide se déplace à Paris ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '15',
      address: "avenue du sentier",
      zipcode: '75015',
      city: 'Paris',
      phoneNumber: '01142987564',
      category: 'trou-de-serrure',
      categoryName: 'Serrurier',
      note: 4.8,
      nbeval: 245
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest15_tfbogj.jpg',
      name: "Koif'Tif",
      email: 'coiftif@gmail.com',
      description: "Coiffeur disponible qui se déplace à Paris ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '16',
      address: "boulevard du var",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0154785698',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.6,
      nbeval: 147
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest16_vid5f1.jpg',
      name: "Coif'Tignasse",
      email: 'coiftign@gmail.com',
      description: "Coiffeur disponible dans ses locaux chic ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '98',
      address: "avenue des champs",
      zipcode: '75008',
      city: 'Paris',
      phoneNumber: '0148569852',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.9,
      nbeval: 342
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest17_pohp90.jpg',
      name: "Peinture de paris",
      email: 'pdp@gmail.com',
      description: "Peintre à domicile ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '45',
      address: "rue de paris",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0148569852',
      category: 'peinture',
      categoryName: 'Peinture',
      note: 4.6,
      nbeval: 87
    },
  ]

  for(let i=0; i<fakeTableau.length; i++){
    var newPrestataire = new prestatairesModel({
      images: fakeTableau[i].images,
      name: fakeTableau[i].name,
      email: fakeTableau[i].email,
      description: fakeTableau[i].description,
      number: fakeTableau[i].number,
      address: fakeTableau[i].address,
      zipcode: fakeTableau[i].zipcode,
      city: fakeTableau[i].city,
      phoneNumber: fakeTableau[i].phoneNumber,
      category: fakeTableau[i].category,
      categoryName: fakeTableau[i].categoryName,
      note: fakeTableau[i].note,
      nbeval: fakeTableau[i].nbeval
    });

    var prestatairesSave = await newPrestataire.save();
  }

  // console.log(newPrestataire)

  res.json({ prestatairesSave });
});

// Force récupération des données
router.get('/recuppresta', async function (req, res, next) {

  var prestataires = await prestatairesModel.find();

  res.json({ prestataires })
});

module.exports = router;
