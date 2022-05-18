var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var uid2 = require("uid2");

var userModel = require("../models/usersModel");

router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var success = []; // DEMANDER
  var result = false;
  var saveUser = null;
  var token = null;

  var userIdentifiant = await userModel.findOne({
    email: req.body.emailFromFront,
  });
  var userPhone = await userModel.findOne({
    phoneNumber: req.body.phoneNumberFromFront,
  });
  var creditC = await userModel.findOne({
    creditCard: req.body.creditCardFromFront, // DEMANDER
  });

  if (userIdentifiant !== null) {
    error.push(`E-mail ${userIdentifiant} déjà présent`);
    console.log(`E-mail ${userIdentifiant} already exists`);
    // res.send(`E-mail ${userIdentifiant} already exists`); POUR TEST POSTMAN ???
    // return
  }
  if (userPhone !== null) {
    error.push(`Numéro de téléphone ${userPhone} déjà présent`);
    console.log(`Phone number ${userPhone} already exists`);
  }
  if (userPhone.length !== 10) {
    error.push("Votre numéro de téléphone doit contenir 10 chiffres");
  }

  if (req.body.passwordFromFront.length < 8) {
    // PEUT-ÊTRE AJOUTER D'AUTRES CONDITION ?
    error.push("Mot de passe trop court");
    console.log("password too short");
  }
  if (
    !bcrypt.compareSync(
      bcrypt.hashSync(req.body.passwordFromFront),
      req.body.confirmPassword
    )
  ) {
    error.push("confirmation du mot de passe différente");
    console.log("different confirm password");
  } else {
    res.json("Vous êtes inscrit(e) !");
    success.push("Vous êtes inscrit(e) !");
    console.log("Sign-up created");
  }

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

  if (creditC !== null) {
    error.push("Carte bancaire déjà présente");
    console.log("Credit card already exists");
  }

  if (error.length == 0) {
    var newUser = new userModel({
      accountType: req.body.accountTypeFromFront,
      firstName: req.body.firstNameFromFront,
      lastName: req.body.lastNameFromFront,
      email: req.body.emailFromFront,
      password: bcrypt.hashSync(req.body.passwordFromFront, 10),
      token: uid2(32),
      creditCard: bcrypt.hashSync(req.body.creditCardFromFront),
      address: req.body.addressFromFront,
      reservations: req.body.reservationsFromFront,
      messages: req.body.messagesFromFront,
      conversations: req.body.conversationsFromFront,
      phoneNumber: req.body.phoneNumberFromFront,
      profilePicture: req.body.profilePictureFromFront,
      note: req.body.noteFromFront,
    });

    var saveUser = await newUser.save();
    console.log("User saved in the database");

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token, success });
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var userIdentifiant = null;
  var error = [];
  var success = [];
  var token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    userIdentifiant = await userModel.findOne({
      email: req.body.emailFromFront,
    });

    if (userIdentifiant) {
      if (
        bcrypt.compareSync(req.body.passwordFromFront, userIdentifiant.password)
      ) {
        result = true;
        token = userIdentifiant.token;
      } else {
        result = false;
        error.push("Email ou Mot de passe incorrect ! Tu veux carrote qui ???");
      }
    } else {
      error.push(
        "Email ou mot de passe incorrect Ah ouai ! Tu veux vraiment me carotte !!! Et ben non !"
      );
    }
    success.push("Connexion réussie !");
  }
  res.json({ result, userIdentifiant, error, token, success });
});

router.get("/get-user/:token", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.params.token });

  if (user !== null) {
    result = true;
  }

  res.json({ result });
});

router.delete("/delete-user", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.body.token });

  if (user !== null) {
    user = user.filter((user) => user.email !== req.body.emailFromFront);

    var userUpdated = await user.save();
    if (userUpdated) {
      result = true;
    }
  }

  res.json({ result });
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
  ];
  for (let i = 0; i < fakeUsers.length; i++) {
    var newFakeUser = new userModel({
      profilePicture: fakeUsers[i].profilePicture,
      firstName: fakeUsers[i].firstName,
      lastName: fakeUsers[i].lastName,
      email: fakeUsers[i].email,
      password: fakeUsers[i].password,
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

module.exports = router;
