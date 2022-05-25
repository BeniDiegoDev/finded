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
      name: 'FAIRPLAY Pereire 17 VW',
      email: 'vwpereire17@gmail.com',
      description: 'Mécanique de précision, controle technique rapide ! Reservez votre créneau dès maitenant, regardez nos disponibilités',
      number: '88',
      address: 'boulevard pereire',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.9,
      nbeval: 92,
      prestation: [{name: 'Controle technique', prix: 100}, {name: 'Vidange + remplacement des filtres', prix: 250}],
      lat : 48.88681033904588,
      lon :  2.3001096017324647
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest10_rtos46.jpg',
      name: 'Atelier Laugier Mécanique',
      email: 'laugiermeca@gmail.com',
      description: "Besoin d'une vidange près de chez vous ? Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '42',
      address: 'rue Laugier',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0161416014',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.5,
      nbeval: 34,
      prestation: [{name: 'Controle technique', prix: 100}, {name: 'Vidange + remplacement des filtres', prix: 250}],
      lat : 48.88272050527023, 
      lon : 2.294792756468576
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest8_vdxlfi.jpg',
      name: 'Auto Mécanique Saint Charles',
      email: 'ctdescartese@gmail.com',
      description: 'CT pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '12',
      address: 'rue saint charles',
      zipcode: '75015',
      city: 'Paris 15',
      phoneNumber: '0166516014',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.7,
      nbeval: 244,
      prestation: [{name: 'Controle technique', prix: 100}, {name: 'Vidange + remplacement des filtres', prix: 250}],
      lat : 48.85147457639041,
      lon : 2.289432742520454
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest9_fimsh8.jpg',
      name: 'Tesa Sécurité - Controle Technique Autosur Paris 17',
      email: 'tesasecur@gmail.com',
      description: 'Controle technique Autosur pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '113',
      address: 'boulevard bessières',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.9,
      nbeval: 124,
      prestation: [{name: 'Controle technique', prix: 90}, {name: 'Controle anti polution', prix: 50}],
      lat : 48.8964694796857,
      lon : 2.3149003240407398
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653296708/FindedApp/controle-technique_thutjd.jpg',
      name: 'Centre contrôle technique DEKRA',
      email: 'dekratest@gmail.com',
      description: 'Controle technique DEKRA pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '64',
      address: 'rue de paris',
      zipcode: '92110',
      city: 'Clichy',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.5,
      nbeval: 214,
      prestation: [{name: 'Controle technique', prix: 90}, {name: 'Controle anti polution', prix: 50}],
      lat : 48.90132196220503,
      lon : 2.305029794797627
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest7_jodpum.jpg',
      name: 'Ici et Ailleurs Paris 17',
      email: 'iciailleurs@gmail.com',
      description: 'Estheticienne qualifié ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '4',
      address: 'rue Gustave Doré',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0171419845',
      category: 'relooking',
      categoryName: 'Estheticienne',
      note: 4.9,
      nbeval: 322,
      prestation: [{name: 'Femme - Epilation intégrale', prix: 50}, {name: 'Femme - Séance UV', prix: 30}, {name: 'Homme - Epilation du torse', prix: 60}, {name: 'Femme - Epilation des sourcils', prix: 30}],
      lat : 48.88693595716425, 
      lon : 2.3034804001211873
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817649/FindedApp/miniatest13_cjgakt.jpg',
      name: 'Full Beaute',
      email: 'fullbeaute@gmail.com',
      description: 'Esthetique homme pas cher ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '119',
      address: 'rue de Tocqueville',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0171414121',
      category: 'relooking',
      categoryName: 'Estheticienne',
      note: 4.8,
      nbeval: 145,
      prestation: [{name: 'Homme - Epilation intégrale', prix: 50}, {name: 'Homme - Séance UV', prix: 30}, {name: 'Homme - Epilation du torse', prix: 60}, {name: 'Homme - Epilation des sourcils', prix: 30}],
      lat : 48.889419154957984, 
      lon : 2.3052399292471466
    },
    {
      images: '',
      name: 'Un Autre Monde',
      email: 'uamonde@gmail.com',
      description: 'Esthetique femme pas cher ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '37',
      address: 'rue de saussure',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0171414121',
      category: 'relooking',
      categoryName: 'Estheticienne',
      note: 4.8,
      nbeval: 145,
      prestation: [{name: 'Femme - Epilation intégrale', prix: 50}, {name: 'Femme - Séance UV', prix: 30}, {name: 'Femme - Epilation des sourcils', prix: 30}],
      lat : 48.88512991767632,  
      lon : 2.315539611935621
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
      categoryName: 'Pédicure',
      note: 4.7,
      nbeval: 35,
      prestation: [{name: 'Massage des pieds', prix: 50}, {name: 'Massage des cheveux', prix: 30}, {name: 'Massage des mains', prix: 100}, {name: 'Massage du visage', prix: 150}],
      lat : 47.547784,
      lon : 2.1036855
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
      categoryName: 'Baby-Sitting',
      note: 4.9,
      nbeval: 421,
      prestation: [{name: "Garde d'enfants - 1h", prix: 50}, {name: "Récupérer l'enfant à l'école", prix: 30}, {name: "Garde d'enfants - 2h", prix: 100}, {name: "Garde d'enfants - Soirée", prix: 150}],
      lat : 47.187784,
      lon : 2.1036855
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817537/FindedApp/miniatest12_mkau8t.jpg',
      name: 'Baby Green',
      email: 'babygreen@gmail.com',
      description: "Garde d'enfants dans notre centre ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '16',
      address: "rue du soleil",
      zipcode: '75016',
      city: 'Paris',
      phoneNumber: '0168878459',
      category: 'mother',
      categoryName: 'Baby-Sitting',
      note: 4.9,
      nbeval: 130,
      prestation: [{name: "Garde d'enfants - 1h", prix: 50}, {name: "Récupérer l'enfant à l'école", prix: 30}, {name: "Garde d'enfants - 2h", prix: 100}, {name: "Garde d'enfants - Soirée", prix: 150}],
      lat : 48.887784,
      lon : 3.4036855
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
      categoryName: 'Massage',
      note: 4.7,
      nbeval: 659,
      prestation: [{name: "Massage des pieds", prix: 50}, {name: "Massage des cheveux", prix: 30}, {name: "Massage des mains", prix: 100}, {name: "Massage du visage", prix: 150}],
      lat : 47.827784,
      lon : 2.4936855
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817471/FindedApp/miniatest11_epcvzs.jpg',
      name: "Massage des Beauxjours",
      email: 'massagedbj@gmail.com',
      description: "Massage de qualité dans notre centre à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '99',
      address: "rue des beauxjours",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0141475754',
      category: 'massage',
      categoryName: 'Massage',
      note: 4.4,
      nbeval: 875,
      prestation: [{name: "Massage des pieds", prix: 50}, {name: "Massage des cheveux", prix: 30}, {name: "Massage des mains", prix: 100}, {name: "Massage du visage", prix: 150}],
      lat : 47.387784,
      lon : 2.4936855
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
      categoryName: 'Serrurier',
      note: 4.9,
      nbeval: 127,
      prestation: [{name: "Trou de serrure", prix: 50}, {name: "Serrure de porte", prix: 30}, {name: "Serrure de fenêtre", prix: 100}, {name: "Serrure de garage", prix: 150}],
      lat : 45.887784,
      lon : 1.4036855
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817694/FindedApp/miniatest14_e0pfqz.jpg',
      name: "Serrurier du sentier",
      email: 'serrursent@gmail.com',
      description: "Serrurier rapide se déplace à Paris ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '15',
      address: "avenue du sentier",
      zipcode: '75015',
      city: 'Paris',
      phoneNumber: '01142987564',
      category: 'trou-de-serrure',
      categoryName: 'Serrurier',
      note: 4.8,
      nbeval: 245,
      prestation: [{name: "Trou de serrure", prix: 50}, {name: "Serrure de porte", prix: 30}, {name: "Serrure de fenêtre", prix: 100}, {name: "Serrure de garage", prix: 150}],
      lat : 47.787784,
      lon : 2.6036855
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest15_tfbogj.jpg',
      name: "Koif'Tif",
      email: 'coiftif@gmail.com',
      description: "Coiffeur disponible qui se déplace à Paris ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '16',
      address: "boulevard du var",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0154785698',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.6,
      nbeval: 147,
      prestation: [{name: "Coiffeur - 1h", prix: 50}, {name: "Coiffeur - 2h", prix: 30}, {name: "Coiffeur - Soirée", prix: 100}, {name: "Coiffeur - Nuit", prix: 150}],
      lat : 47.987784,
      lon : 2.5036855
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest16_vid5f1.jpg',
      name: "Coif'Tignasse",
      email: 'coiftign@gmail.com',
      description: "Coiffeur disponible dans ses locaux chic ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '98',
      address: "avenue des champs",
      zipcode: '75008',
      city: 'Paris',
      phoneNumber: '0148569852',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.9,
      nbeval: 342,
      prestation: [{name: "Coiffeur - 1h", prix: 50}, {name: "Coiffeur - 2h", prix: 30}, {name: "Coiffeur - Soirée", prix: 100}, {name: "Coiffeur - Nuit", prix: 150}],
      lat : 48.887784,
      lon : 2.2036855
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest17_pohp90.jpg',
      name: "Peinture de paris",
      email: 'pdp@gmail.com',
      description: "Peintre à domicile ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '45',
      address: "rue de paris",
      zipcode: '75017',
      city: 'Paris',
      phoneNumber: '0148569852',
      category: 'peinture',
      categoryName: 'Peinture',
      note: 4.6,
      nbeval: 87,
      prestation: [{name: "Peinture de maison", prix: 50}, {name: "Peinture de bureau", prix: 30}, {name: "Peinture de salon", prix: 100}, {name: "Peinture de cuisine", prix: 150}],
      lat : 46.887784,
      lon : 2.9036855
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
      categoryName: fakeTableau[i].categoryName,
      note: fakeTableau[i].note,
      nbeval: fakeTableau[i].nbeval,
      prestation: fakeTableau[i].prestation,
      lat: fakeTableau[i].lat,
      lon: fakeTableau[i].lon,
    });

    var prestatairesSave = await newPrestataire.save();
  }


  res.json({ prestatairesSave });
});


router.post('/add-reservation', async function (req, res, next) {
 
  var token = req.body.token
  var searchUser = await userModel.findOne({token: token})
  if(searchUser){  
    
      var reservation = {
              date: req.body.date,
              horaire: req.body.horaire,
              prix: req.body.prix,
              name: req.body.name,
              status: "En cours",
              prestations: JSON.parse(req.body.listPresta),
          }
      searchUser.reservations.push(reservation)
      let saveUser = await searchUser.save()
      // console.log(searchUser.reservations[searchUser.reservations.length - 1])
      // console.log(reservation)
      res.json({result: true, reservation : searchUser.reservations[searchUser.reservations.length - 1]})
    }else{
      res.json({result: false})
    }
  }
  )

// Force récupération des données
router.get('/recuppresta', async function (req, res, next) {

  var prestataires = await prestatairesModel.find();

  res.json({ prestataires })
});


// route POST pour mettre à jour une réservation
router.post('/cancel-reservation', async function (req, res, next) {
  

  var token = req.body.token
  var searchUser = await userModel.findOne({token: token})
  let result = false

  if(searchUser){

    for ( let i = 0; i < searchUser.reservations.length; i++ ) {

      if ( searchUser.reservations[i].id == req.body.id) {
        console.log('reservation trouvée')
        searchUser.reservations[i].status = "Annulée"
        result = true

      }
    }
    await searchUser.save()
  }
  
  res.json(result)
});





 


    


module.exports = router;
