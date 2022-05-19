var express = require('express');
var router = express.Router();

// Import du cryptage des mots de passe
// var uid2 = require('uid2')
var bcrypt = require('bcrypt');

var prestatairesModel = require('../models/prestataires')
var userModel = require('../models/usersModel')

// Force fake upload préstataire
router.post('/importpresta', async function (req, res, next) {

  var fakeTableau = [
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      name: 'Controle technique Fiacre',
      email: 'ctdufiacre@gmail.com',
      description: 'Controle technique pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '25',
      address: 'rue du fiacre',
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0161416014',
      category: 'mechanic',
      note: 4.5
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      name: 'Controle technique Descartes',
      email: 'ctdescartese@gmail.com',
      description: 'CT pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '15',
      address: 'rue descartes',
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0166516014',
      category: 'mechanic',
      note: 4.8
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      name: 'CT La Fleche',
      email: 'ctlafleche@gmail.com',
      description: 'Controle technique pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '68',
      address: 'avenue des arts',
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0161419845',
      category: 'mechanic',
      note: 4.9
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
      note: 4.9
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest7_jodpum.jpg',
      name: 'Beauty People',
      email: 'beautyppl@gmail.com',
      description: 'Estheticienne pas cher ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '98',
      address: 'rue du peuple',
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0171414121',
      category: 'relooking',
      note: 4.8
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
      note: 4.7
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
      note: 4.9
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest3_aumalt.jpg',
      name: 'Baby Green',
      email: 'babygreen@gmail.com',
      description: "Garde d'enfants dans notre centre ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '16',
      address: "rue du soleil",
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0168878459',
      category: 'mother',
      note: 4.9
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
      note: 4.7
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest5_nnjibb.jpg',
      name: "Massage des Beauxjours",
      email: 'massagedbj@gmail.com',
      description: "Massage de qualité dans notre centre à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '99',
      address: "rue des beauxjours",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0141475754',
      category: 'massage',
      note: 4.9
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
      note: 4.9
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest4_yoqnq9.jpg',
      name: "Serrurier du sentier",
      email: 'deblokserr@gmail.com',
      description: "Serrurier rapide se déplace à Paris ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '15',
      address: "avenue du sentier",
      zipcode: '75015',
      city: 'Paris',
      phoneNumber: '01142987564',
      category: 'trou-de-serrure',
      note: 4.8
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
      note: fakeTableau[i].note
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

router.post("/importusers", async function (req, res, next) {
  var fakeUsers = [
    {
      profilePicture: "https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg",
      firstName: "James",
      lastName: "BROWN",
      email: "jamesbown@gmail.com",
      password: bcrypt.hashSync("dayrghauij", 10),
      number: "15",
      address: "rue de la paix",
      ZIP: "93240",
      city: "Stains",
      phoneNumber: "0123456703",
      reservations: "Babysitter",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
    {
      profilePicture:
        "https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg",
      firstName: "Mickel",
      lastName: "WHITE",
      email: "white@gmail.com",
      password: bcrypt.hashSync("dayrghauij", 10),
      number: "20",
      address: "rue du coin",
      ZIP: "75019",
      city: "Paris",
      phoneNumber: "0600466789",
      reservations: "Coiffeur",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
    {
      profilePicture:
        "https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg",
      firstName: "Maurice",
      lastName: "GREEN",
      email: "green@gmail.com",
      password: bcrypt.hashSync("dayrghauij", 10),
      number: "30",
      address: "rue de l'horizon",
      ZIP: "93310",
      city: "Le Pré Saint Gervais",
      phoneNumber: "0633456711",
      reservations: "Plombier",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
    {
      profilePicture:
        "https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg",
      firstName: "Rose",
      lastName: "BRUME",
      email: "roseb@gmail.com",
      password: bcrypt.hashSync("dayrghauij", 10),
      creditCard: bcrypt.hashSync("5324150236587452", 10),
      number: "80",
      address: "Allée des voyageurs",
      ZIP: "91150",
      city: "Etampes",
      phoneNumber: "0657253611",
      reservations: "Mécanicien",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
  ]
  for (let i = 0; i < fakeUsers.length; i++) {
    var newFakeUser = new userModel({
      profilePicture: fakeUsers[i].profilePicture,
      firstName: fakeUsers[i].firstName,
      lastName: fakeUsers[i].lastName,
      email: fakeUsers[i].email,
      password: fakeUsers[i].password,
      creditCard: fakeUsers[i].creditCard,
      number: fakeUsers[i].number,
      address: fakeUsers[i].address,
      ZIP: fakeUsers[i].ZIP,
      city: fakeUsers[i].city,
      phoneNumber: fakeUsers[i].phoneNumber,
      reservations: fakeUsers[i].reservations,
      messages: fakeUsers[i].messages,
      conversations: fakeUsers[i].conversations,
      note: fakeUsers[i].note,
    });
    var saveFakeUser = await newFakeUser.save();
  }
  res.json({ saveFakeUser });
});
router.get('/recupusers', async function (req, res, next) {

  var users = await userModel.find();

  res.json({ users })
});
module.exports = router;
