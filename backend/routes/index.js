var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

var config = require("./config");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
 }
 mongoose.connect(config.mongoDB, options, (err)=>{
  if(err){
    console.error('Erreur de connexion à mongoDB : '+err);
    } else {
      console.log('connecté à la DB')
    }
}
 );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "FINDED" });
});

module.exports = router;
