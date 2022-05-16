// var express = require('express');
// var router = express.Router();
// const bcryptjs = require("bcryptjs");
// var uid2 = require('uid2');

// var userModel = require('../models/usersModel')


// router.post('/sign-up', async function(req,res,next){

//   var error = []
//   var result = false
//   var saveUser = null

//   const userEmail = await userModel.findOne({
//     email: req.body.emailFromFront
//   })
//   const userUsername = await userModel.findOne({
//     username: req.body.usernameFromFront
//   })
  
//   if(userEmail != null){
//     error.push('utilisateur déjà présent')
//   }
//   if(userUsername != null){
//     error.push('utilisateur déjà présent')
//   }

//   if(req.body.usernameFromFront == ''
//   || req.body.emailFromFront == ''
//   || req.body.passwordFromFront == ''
//   ){
//     error.push('champs vides')
//   }


//   if(error.length == 0){
//     var newUser = new userModel({
//       username: req.body.usernameFromFront,
//       email: req.body.emailFromFront,
//       password: req.body.passwordFromFront
//     })
  
//     saveUser = await newUser.save()
  
    
//     if(saveUser){
//       result = true
//     }
//   }
  

//   res.json({result, saveUser, error})
// })

// router.post('/sign-in', async function(req,res,next){

//   var result = false
//   var user = null
//   var error = []
  
//   if(req.body.emailFromFront == ''
//   || req.body.passwordFromFront == ''
//   ){
//     error.push('champs vides')
//   }

//   if(error.length == 0){
//       user = await userModel.findOne({
//       email: req.body.emailFromFront,
//       password: req.body.passwordFromFront
//     })
    
//     if(user){
//       result = true
//     } else {
//       error.push('email ou mot de passe incorrect')
//     }
//   }
  
//   res.json({result, user, error})

// })

// module.exports = router;


const userModel= require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config");
const verifyToken = require("../middlewares/verifyToken");
const express = require("express");
const professionalModel = require("../models/professionalData");

const router = express.Router();

router.get('/login', function(req, res, next) {
  // res.json('');
});

router.post("/sign-up", async (req, res, next) => {
    try{
        const userIndentifiant = await userModel.findOne({
            email: req.body.email
        });
        const phone = await userModel.findOne({
            phoneNumber: req.body.phoneNumber
        });

        if(userIndentifiant) {
            res.status(400).send(`Email ${req.body.email} already exists`);
            return;
        }
        if(phone) {
            res.status(400).send(`Phone number ${req.body.phoneNumber} already exists`);
            return;
        };

        if(req.body.password.length < 8) {
            res.status(400).send("Password too short");
            return;
        }
        if(!bcryptjs.compareSync(req.body.password, bcryptjs.hashSync(req.body.confirmPassword))){
            res.status(401).send("Password and confirm password have to be sames");
            return;
        }else {
            res.send("Sign-up created");
            console.log("Sign-up created");
        };

        await userModel.create({
            accountType: req.body.accountType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password),         
            address: req.body.address,
            creditCard: bcryptjs.hashSync(req.body.creditCard),
            reservations: req.body.reservations,
            messages:req.body.messages,
            conversations:req.body.conversations,
            phoneNumber: req.body.phoneNumber,
            profilePicture: req.body.profilePicture,// ou avatar
        });
//////////////////////  OU  ////////////////////////////////

        // var newUser = new userModel({
        //     accountType: req.body.accountType,
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     password: bcryptjs.hashSync(req.body.password),         
        //     address: req.body.address,
        //     creditCard: req.body.creditCard,
        //     reservations: req.body.reservations,
        //     messages:req.body.messages,
        //     conversations:req.body.conversations,
        //     phoneNumber: req.body.phoneNumber,
        //     profilePicture: req.body.profilePicture,           
        // });
        // 
        // var userSave = await newUser.save();
    }catch (err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


router.post("/sign-in", async (req, res, next) => {
    try{
        const userIndentifiant = await userModel.findOne({
        email: req.body.email
        }).exec();

        if(!userIndentifiant){
            res.status(404).send("Please enter your registred email")
            return;
        };

        if(!bcryptjs.compareSync(req.body.password, userIndentifiant.password)) {

        res.status(401).send("Invalid password");
        console.log("Invalid password");
        return;

        }else{
            const token = jwt.sign({
                id: userIndentifiant._id
                },
                config.secret,
                {
                expiresIn: 3600
                });
                
            res.status(200).json({
                message: "Connexion OK",
                token: token
            });
            console.log("Connexion OK");
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

router.get("/connected", verifyToken, (req, res, next) => {
  res.send(`Hello ${req.customerUser.lastName}`);
});

// Créer une réservation
router.post("/reservation",  async (req, res, next) => {
  
})

// Rechercher un prestataire
router.get("/search-presta",  async (req, res, next) => {
  const prestaSearch = await professionalModel.findOne({

  })
})

// Voir le profil d’un prestataire
router.get("/:id",  async (req, res, next) => {

})

/////////////////////////////////////////////////////////////////////////////////

// Suppression d'un utilisateur
router.delete("/:id", async (req, res) => {
  const sup = await userModel.deleteOne({
      _id: req.params.id
  }).exec();
  console.log(sup)
  if (result.deletedCount === 0) {
      res.status(404).json({
          message: "Cet utilisateur n'existe pas",

      });
  } else {
      res.send("Utilisateur supprimé")
  }
});

// Mises à jour  (update ou edit)
router.put("/updateFirstName/:id", async (req, res) => {
  try {
    const upFirstName = await userModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
        },
      }
    );
    res.json(upFirstName);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/updateLastName/:id", async (req, res) => {
  try {
    const upName = await userModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          lastName: req.body.lastName,
        },
      }
    );
    res.json(upName);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/updateMail/:id", async (req, res) => {
  try {
    const upMail = await userModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
        },
      }
    );
    res.json(upMail);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/updateTel/:id", async (req, res) => {
  try {
    const upTel = await userModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          phoneNumber: req.body.phoneNumber,
        },
      }
    );
    res.json(upTel);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/updateAddress/:id", async (req, res) => {
  try {
    const upAddress = await userModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          address: req.body.address,
        },
      }
    );
    res.json(upAddress);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
