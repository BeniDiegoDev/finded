const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
const express = require("express");

const professionalModel = require("../models/professionalData");
const userModel= require("../models/usersModel");

const router = express.Router();

router.get('/login', function(req, res, next) {
  // res.json('');
});

router.post("/sign-up", async (req, res, next) => {
    try{
        var error = [];

        const userIndentifiant = await userModel.findOne({
            email: req.body.email
        });
        const phone = await userModel.findOne({
            phoneNumber: req.body.phoneNumber
        });

        if(userIndentifiant) {
            res.status(400).send(`Email ${req.body.email} already exists`);
            error.push('Déjà existant');
            return;
        }
        if(phone) {
            res.status(400).send(`Phone number ${req.body.phoneNumber} already exists`);
            error.push('Déjà existant');
            return;
        };

        if(req.body.password.length < 8) {
            res.status(400).send("Password too short");
            error.push('Mot de passe trop court');
            return;
        }
        if(!bcryptjs.compareSync(req.body.password, bcryptjs.hashSync(req.body.confirmPassword))){
            res.status(401).send("Password and confirm password have to be sames");
            error.push('La confirmation du mot de passe ne correspond pas');
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
    }catch (err){
        console.log(err);
        res.status(500).send("Something went wrong");
        error.push('Erreur détectée, nous mettons tout en oeuvre pour y remédier');
    }
});


router.post("/sign-in", async (req, res, next) => {
    try{
        const userIndentifiant = await userModel.findOne({
        email: req.body.email
        }).exec();

        if(!userIndentifiant){
            res.status(404).send("Please enter your registred email")
            error.push(`L'email ${req.body.email} non existant`);
            return;
        };

        if(!bcryptjs.compareSync(req.body.password, userIndentifiant.password)) {

        res.status(401).send("Invalid password");
        console.log("Invalid password");
        error.push('Mot de passe invalide');
        return;

        }else{
            const token = jwt.sign({
                id: userIndentifiant._id
                },
                "findedAddToken",
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
        error.push('Erreur détectée, nous mettons tout en oeuvre pour y remédier');
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
