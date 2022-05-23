var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var uid2 = require("uid2");

var userModel = require("../models/usersModel");


router.post("/sign-in", async function (req, res, next) {

  var userEmail = req.body.userEmail;
  var password = req.body.password;

  var user = await userModel.findOne({ email : userEmail });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        result: true,
        user: user,

      });
    } else {
      res.json({
        result: false,
      });
    }
  } else {
    res.json({
      result: false,
    });
  }
});



router.post("/sign-up", async function (req, res, next) {

  // var fakeTableau = [
  //   {
  //     date: '15/04/2022',
  //     heure: '10h-11h',
  //     price: 50,
  //     prestataires: 'CT Montparn',
  //     status: 'Terminée',
  //   },
  //   {
  //     date: '23/03/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: "Coif'Tignasse",
  //     status: 'Terminée',
  //   },
  //   {
  //     date: '28/05/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Massage des Beauxjours',
  //     status: 'Annulée',
  //   },
  //   {
  //     date: '04/08/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Serrurier du sentier',
  //     status: 'Annulée',
  //   },
  //   {
  //     date: '10/07/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Baby Green',
  //     status: 'En cours',
  //   },
  //   {
  //     date: '15/07/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Beauty People',
  //     status: 'En cours',
  //   },
  //   {
  //     date: '21/07/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Deblok Serrurier',
  //     status: 'En cours',
  //   },
  //   {
  //     date: '26/08/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: "Koif'Tif",
  //     status: 'En cours',
  //   },
  //   {
  //     date: '03/09/2022',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Estheticienne Beauté',
  //     status: 'En cours',
  //   }
  // ]

  // var newReservation = []
  // for(let i=0; i<fakeTableau.length; i++){
  //   newReservation.push( {
  //                     date: fakeTableau[i].date,
  //                     heure: fakeTableau[i].heure,
  //                     price: fakeTableau[i].price,
  //                     prestataires: fakeTableau[i].prestataires,
  //                     status: fakeTableau[i].status,
  //   });
  // }

  hash = bcrypt.hashSync(req.body.password, 10);

  var error = false;
  var result = false;



  var userIdentifiant = await userModel.findOne({
    email: req.body.userEmail,
  });



  if (userIdentifiant !== null) {
    error = true;
    console.log(`E-mail ${userIdentifiant} already exists`);
  }
 

  if (error === false) {
    var newUser = new userModel({
      accountType: req.body.accountType,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.userEmail,
      phoneNumber: req.body.phoneNumber,
      password: hash,
      token: uid2(32),
      creditCard: req.body.creditCard,
      address: req.body.address ,
      reservations: newReservation,
      messages: req.body.messages ,
      conversations: req.body.conversations ,
      phoneNumber: req.body.phoneNumber ,
      profilePicture: req.body.profilePicture,
      note: req.body.note,
    });

    var saveUser = await newUser.save();
    console.log("User saved in the database");

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error });
});

// Route en POST pour ajouter une réservation à un utilisateur
router.post("/add-reservation", async function (req, res, next) {

  var result = false;
  var error = "Problème lors de l'ajout de la réservation";

  var user = await userModel.updateOne({ token: req.body.token }, {
    $push: { reservations: req.body.reservation },
  });

  if (user) {
    result = true;
    error = "Réservation ajoutée";
  } else {
    result = false;
  }
  
  res.json({ result, error });
});


// route en post pour modifier le mot de passe d'un utilisateur
router.post("/update-phoneNumber", async function (req, res, next) {

  console.log(req.body)
  var result = false;
  
  var message = "Problème lors de la modification du numéro de téléphone";

  var user = await userModel.updateOne({ token: req.body.token }, {
    phoneNumber: req.body.phoneNumber,
  });

  if (user) {
    result = true;
    message = "Numéro de téléphone modifié";
  } else {
    result = false;
  }

  res.json({ result, message });
});

// route en get pour récupérer les réservations d'un user en fonction de son token
router.get("/get-reservations/:token", async function (req, res, next) {


  var result = false;
  var message = "Problème lors de la récupération des réservations";
  var reservations = [];


  var user = await userModel.findOne({ token: req.params.token });

  if (user) {
    reservations = user.reservations;
    result = true;
    message = "Réservations récupérées";
  } else {
    result = false;
  }

  res.json({ result, message, reservations });

});


  
module.exports = router;
