var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var uid2 = require("uid2");

var userModel = require("../models/usersModel");


router.post("/sign-in", async function (req, res, next) {

  console.log(req.body.userEmail);
  console.log(req.body.password);

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
  //     date: 'Lundi 15 avril',
  //     heure: '10h-11h',
  //     price: 50,
  //     prestataires: 'CT Montparn',
  //     status: 'Terminée',
  //   },
  //   {
  //     date: 'Mardi 23 mars',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: "Coif'Tignasse",
  //     status: 'Terminée',
  //   },
  //   {
  //     date: 'Samedi 28 mai',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Massage des Beauxjours',
  //     status: 'Annulée',
  //   },
  //   {
  //     date: 'Vendredi 4 août',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Serrurier du sentier',
  //     status: 'Annulée',
  //   },
  //   {
  //     date: 'Jeudi 10 juillet',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Baby Green',
  //     status: 'En cours',
  //   },
  //   {
  //     date: 'Mercredi 15 juillet',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Beauty People',
  //     status: 'En cours',
  //   },
  //   {
  //     date: 'Samedi 21 juillet',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Deblok Serrurier',
  //     status: 'En cours',
  //   },
  //   {
  //     date: 'Lundi 26 août',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: "Koif'Tif",
  //     status: 'En cours',
  //   },
  //   {
  //     date: 'Vendredi 3 septembre',
  //     heure: '16h-17h',
  //     price: 150,
  //     prestataires: 'Estheticienne Beauté',
  //     status: 'En cours',
  //   }
  // ]

  // for(let i=0; i<fakeTableau.length; i++){
  //   var newReservation = {
  //                     date: fakeTableau[i].date,
  //                     heure: fakeTableau[i].heure,
  //                     price: fakeTableau[i].price,
  //                     prestataires: fakeTableau[i].prestataires,
  //                     status: fakeTableau[i].status,
  //   };
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
      password: hash,
      token: uid2(32),
      creditCard: req.body.creditCard,
      address: req.body.address ,
      //reservations: newReservation,
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


module.exports = router;
