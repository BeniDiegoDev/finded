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

  var user = await userModel.findOne({ userEmail: userEmail });
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
    user = user.filter((user) => user.email !== req.body.userEmail);

    var userUpdated = await user.save();
    if (userUpdated) {
      result = true;
    }
  }

  res.json({ result });
});


router.post("/sign-up", async function (req, res, next) {


  hash = bcrypt.hashSync(req.body.password, 10);

  var error = [];
  var success = []; // DEMANDER
  var result = false;
  var saveUser = null;
  var token = null;

  var userIdentifiant = await userModel.findOne({
    email: req.body.userEmail,
  });



  if (userIdentifiant !== null) {
    error.push(`E-mail ${userIdentifiant} déjà présent`);
    console.log(`E-mail ${userIdentifiant} already exists`);
    // res.send(`E-mail ${userIdentifiant} already exists`); POUR TEST POSTMAN ???
    // return
  }
 

  if (req.body.password.length < 8) {
    // PEUT-ÊTRE AJOUTER D'AUTRES CONDITION ?
    error.push("Mot de passe trop court");
    console.log("password too short");
  }
  

  if (
    req.body.firstName == "" ||
    req.body.lastName == "" ||
    req.body.userEmail == "" ||
    req.body.phoneNumber == "" ||
    req.body.password == "" ||
    req.body.confirmPassword == ""
  ) {
    error.push("champ(s) vide(s)");
  }

  if (error.length == 0) {
    var newUser = new userModel({
      accountType: req.body.accountType,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.userEmail,
      password: hash,
      token: uid2(32),
      creditCard: req.body.creditCard,
      address: req.body.address ,
      reservations: req.body.reservations ,
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

  res.json({ result, saveUser  });
});


module.exports = router;
