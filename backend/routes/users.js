var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
// var uid2 = require('uid2');

var userModel = require("../models/usersModel");

router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var success = []; // DEMANDER
  var result = false;
  var saveUser = null;

  const userEmail = await userModel.findOne({
    email: req.body.emailFromFront,
  });
  const userPhone = await userModel.findOne({
    phoneNumber: req.body.phoneNumberFromFront,
  });
  const creditC = await userModel.findOne({
    creditCard: req.body.creditCardFromFront, // DEMANDER
  });

  if (userEmail != null) {
    error.push(`E-mail ${userEmail} déjà présent`);
    console.log(`E-mail ${userEmail} already exists`);
    // res.send(`E-mail ${userEmail} already exists`); POUR TEST POSTMAN ???
    // return
  }
  if (userPhone != null) {
    error.push(`Numéro de téléphone ${userPhone} déjà présent`);
    console.log(`Phone number ${userPhone} already exists`);
  }
  if(userPhone.length != 10) {
    error.push('Votre numéro de téléphone doit contenir 10 chiffres');
  }

  if(req.body.passwordFromFront.length < 8) { // PEUT-ÊTRE AJOUTER D4AUTRES CONDITION ?
    error.push('Mot de passe trop court');
    console.log('password too short');
  }
  if(!bcrypt.compareSync(bcrypt.hashSync(req.body.passwordFromFront), req.body.confirmPassword)) {
    error.push('confirmation du mot de passe différente');
    console.log('different confirm password');
  } else {
    res.json("Vous êtes inscrit(e) !");
    success.push('Vous êtes inscrit(e) !');
    console.log("Sign-up created");
};

  if (
    req.body.firstNameFromFront == "" ||
    req.body.lastNameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.phoneNumberFromFront == "" ||
    req.body.passwordFromFront == "" ||
    req.body.confirmPassword == ""
  ) {
    error.push("champ(s) vide(s)");
  }

  if (creditC != null) {
    error.push('Carte bancaire déjà présente');
    console.log('Credit card already exists');
  }

  if (error.length == 0) {
    var newUser = new userModel({
      accountType: req.body.accountTypeFromFront,
      firstName: req.body.firstNameFromFront,
      lastName: req.body.lastNameFromFront,
      email: req.body.emailFromFront,
      password: bcrypt.hashSync(req.body.passwordFromFront),
      creditCard: bcrypt.hashSync(req.body.creditCardFromFront),
      address: req.body.addressFromFront,
      reservations: req.body.reservationsFromFront,
      messages: req.body.messagesFromFront,
      conversations: req.body.conversationsFromFront,
      phoneNumber: req.body.phoneNumberFromFront,
      profilePicture: req.body.profilePictureFromFront,
    });

    saveUser = await newUser.save();
    console.log('User saved in the database');
    if (saveUser) {
      result = true;
    }
  }

  res.json({ result, saveUser, error });
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];
  var success = [];

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    });
// AJOUTER TOKEN
    if (user) {
      result = true;
    } else {
      error.push("email ou mot de passe incorrect");
    }
    success.push('Connexion réussie !');
  }

  res.json({ result, user, error });
});

module.exports = router;
