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

  res.json({ result, saveUser, error });
});


module.exports = router;
