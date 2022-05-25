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
      address: 'boulevard Pereire',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.9,
      nbeval: 92,
      prestation: [{ name: 'Controle technique', prix: 100 }, { name: 'Vidange + remplacement des filtres', prix: 250 }],
      lat: 48.88681033904588,
      lon: 2.3001096017324647
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
      prestation: [{ name: 'Controle technique', prix: 100 }, { name: 'Vidange + remplacement des filtres', prix: 250 }],
      lat: 48.88272050527023,
      lon: 2.294792756468576
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest8_vdxlfi.jpg',
      name: 'Auto Mécanique Saint Charles',
      email: 'ctdescartese@gmail.com',
      description: 'CT pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '12',
      address: 'rue Saint Charles',
      zipcode: '75015',
      city: 'Paris 15',
      phoneNumber: '0166516014',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.7,
      nbeval: 244,
      prestation: [{ name: 'Controle technique', prix: 100 }, { name: 'Vidange + remplacement des filtres', prix: 250 }],
      lat: 48.85147457639041,
      lon: 2.289432742520454
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817311/FindedApp/miniatest9_fimsh8.jpg',
      name: 'Tesa Sécurité - Controle Technique Autosur Paris 17',
      email: 'tesasecur@gmail.com',
      description: 'Controle technique Autosur pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '113',
      address: 'boulevard Bessières',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.9,
      nbeval: 124,
      prestation: [{ name: 'Controle technique', prix: 90 }, { name: 'Controle anti polution', prix: 50 }],
      lat: 48.8964694796857,
      lon: 2.3149003240407398
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653296708/FindedApp/controle-technique_thutjd.jpg',
      name: 'Centre contrôle technique DEKRA',
      email: 'dekratest@gmail.com',
      description: 'Controle technique DEKRA pres de vous ! Commandez votre prestation dès maitenant, regardez nos disponibilités',
      number: '64',
      address: 'rue de Paris',
      zipcode: '92110',
      city: 'Clichy',
      phoneNumber: '0161419845',
      category: 'mechanic',
      categoryName: 'Mécanique',
      note: 4.5,
      nbeval: 214,
      prestation: [{ name: 'Controle technique', prix: 90 }, { name: 'Controle anti polution', prix: 50 }],
      lat: 48.90132196220503,
      lon: 2.305029794797627
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
      prestation: [{ name: 'Femme - Epilation intégrale', prix: 50 }, { name: 'Femme - Séance UV', prix: 30 }, { name: 'Homme - Epilation du torse', prix: 60 }, { name: 'Femme - Epilation des sourcils', prix: 30 }],
      lat: 48.88693595716425,
      lon: 2.3034804001211873
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
      note: 4.2,
      nbeval: 542,
      prestation: [{ name: 'Homme - Epilation intégrale', prix: 50 }, { name: 'Homme - Séance UV', prix: 30 }, { name: 'Homme - Epilation du torse', prix: 60 }, { name: 'Homme - Epilation des sourcils', prix: 30 }],
      lat: 48.889419154957984,
      lon: 2.3052399292471466
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494431/FindedApp/baby-sitting-lyon-babysitter-lyon_nqvfn5.jpg',
      name: 'Un Autre Monde',
      email: 'uamonde@gmail.com',
      description: 'Esthetique femme pas cher ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '37',
      address: 'rue de Saussure',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0171414121',
      category: 'relooking',
      categoryName: 'Estheticienne',
      note: 4.8,
      nbeval: 145,
      prestation: [{ name: 'Femme - Epilation intégrale', prix: 50 }, { name: 'Femme - Séance UV', prix: 30 }, { name: 'Femme - Epilation des sourcils', prix: 30 }],
      lat: 48.88512991767632,
      lon: 2.315539611935621
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest6_miijlx.jpg',
      name: 'Pédicure Podologue Paris 17',
      email: 'pedipodo@gmail.com',
      description: 'Meilleur podologue du Moment à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '126',
      address: "rue Cardinet",
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0114578459',
      category: 'massage-des-pieds',
      categoryName: 'Pédicure',
      note: 4.7,
      nbeval: 35,
      prestation: [{ name: 'Massage des pieds', prix: 50 }, { name: 'Reflexologie plantaire', prix: 150 }],
      lat: 48.88691421898676,
      lon: 2.3129098695533044
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494431/FindedApp/une-pedicure-maison-au-bicarbonate-de-soude_bx6xkk.jpg',
      name: 'Pédicure, Podologue, Réflexologue',
      email: 'ppr@gmail.com',
      description: 'Meilleur podologue du Moment à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités',
      number: '126',
      address: "avenue de Saint-Ouen",
      zipcode: '75018',
      city: 'Paris 18',
      phoneNumber: '0114578459',
      category: 'massage-des-pieds',
      categoryName: 'Pédicure',
      note: 4.4,
      nbeval: 457,
      prestation: [{ name: 'Massage des pieds', prix: 50 }, { name: 'Reflexologie plantaire', prix: 150 }],
      lat: 48.89712840660722,
      lon: 2.328702716227063
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest3_aumalt.jpg',
      name: 'Kinougarde Neuilly-sur-Seine',
      email: 'kinougarde@gmail.com',
      description: "Garde d'enfants à domicile ou dans notre centre ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '133',
      address: "avenue Charles de Gaulle",
      zipcode: '92200',
      city: 'Neuilly-sur-Seine',
      phoneNumber: '0114758459',
      category: 'mother',
      categoryName: 'Baby-Sitting',
      note: 4.3,
      nbeval: 65,
      prestation: [{ name: "Garde d'enfants - 1h", prix: 50 }, { name: "Récupérer l'enfant à l'école", prix: 30 }, { name: "Garde d'enfants - 2h", prix: 100 }, { name: "Garde d'enfants - Soirée", prix: 150 }],
      lat: 48.882618756669864,
      lon: 2.2672582923095868
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817537/FindedApp/miniatest12_mkau8t.jpg',
      name: 'Educazen',
      email: 'educazen@gmail.com',
      description: "Garde d'enfants dans notre centre ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '19',
      address: "rue Ganneron",
      zipcode: '75018',
      city: 'Paris 18',
      phoneNumber: '0168878459',
      category: 'mother',
      categoryName: 'Baby-Sitting',
      note: 4.9,
      nbeval: 130,
      prestation: [{ name: "Garde d'enfants - 1h", prix: 50 }, { name: "Récupérer l'enfant à l'école", prix: 30 }, { name: "Garde d'enfants - 2h", prix: 100 }, { name: "Garde d'enfants - Soirée", prix: 150 }],
      lat: 48.887405699515625,
      lon: 2.3278132002423755
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494431/FindedApp/devenir-estheticienne-sans-le-bac_p6i2oe.jpg',
      name: 'Happysitters',
      email: 'happysitters@gmail.com',
      description: "Garde d'enfants dans notre centre ! Reservez votre créneau dès maitenant, regardez nos disponibilités",
      number: '11',
      address: "rue Dulong",
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0168878459',
      category: 'mother',
      categoryName: 'Baby-Sitting',
      note: 4.7,
      nbeval: 147,
      prestation: [{ name: "Garde d'enfants - 1h", prix: 50 }, { name: "Récupérer l'enfant à l'école", prix: 30 }, { name: "Garde d'enfants - 2h", prix: 100 }, { name: "Garde d'enfants - Soirée", prix: 150 }],
      lat: 48.88413223565174,
      lon: 2.3175135177332953
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest5_nnjibb.jpg',
      name: "Bien être Royal",
      email: 'beroyal@gmail.com',
      description: "Massage dans notre centre luxe à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '41',
      address: "rue Edouard Vaillant",
      zipcode: '92300',
      city: 'Levallois-Perret',
      phoneNumber: '0147496754',
      category: 'massage',
      categoryName: 'Massage',
      note: 4.7,
      nbeval: 659,
      prestation: [{ name: "Massage des pieds", prix: 50 }, { name: "Massage des cheveux", prix: 30 }, { name: "Massage des mains", prix: 70 }, { name: "Massage du visage", prix: 55 }],
      lat: 48.894344340930026,
      lon: 2.29082016658191
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817471/FindedApp/miniatest11_epcvzs.jpg',
      name: "Bien-Être et Soins énergétiques",
      email: 'besenerg@gmail.com',
      description: "Massage de qualité dans notre centre à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '1',
      address: "rue Louise Michel",
      zipcode: '92300',
      city: 'Levallois-Perret',
      phoneNumber: '0141475754',
      category: 'massage',
      categoryName: 'Massage',
      note: 4.4,
      nbeval: 875,
      prestation: [{ name: "Massage des pieds", prix: 50 }, { name: "Massage des cheveux", prix: 30 }, { name: "Massage des mains", prix: 65 }, { name: "Massage du visage", prix: 60 }],
      lat: 48.88712086194752,
      lon: 2.2836962193890487
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494310/FindedApp/8-raisons-de-se-faire-masser-regulierement-rennes-massage-bretagne-ille-et-vilaine-audrey-besson_kjbemo.jpg',
      name: "XIANGFEI",
      email: 'xiangfei@gmail.com',
      description: "Massage de qualité dans notre centre à Paris ! Reservez votre prestation dès maitenant, regardez nos disponibilités",
      number: '125',
      address: "rue de Tocqueville",
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0141475754',
      category: 'massage',
      categoryName: 'Massage',
      note: 4.8,
      nbeval: 352,
      prestation: [{ name: "Massage des pieds", prix: 50 }, { name: "Massage des cheveux", prix: 30 }, { name: "Massage des mains", prix: 65 }, { name: "Massage du visage", prix: 60 }],
      lat: 48.88954761582361,
      lon: 2.304810568900421
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494220/FindedApp/metier-coiffure-cap_q3rf5w.jpg',
      name: 'Valessio - Coiffeur Paris 7',
      email: 'valessio7@gmail.com',
      description: 'Quand on parle des tendances et des techniques de balayage ou de mise en évidence de la couleur des cheveux, les différences sont parfois tellement nuancées qu’il est difficile de bien comprendre quoi choisir.',
      number: '27',
      address: 'avenue de la Motte-Picquet',
      zipcode: '75007',
      city: 'Paris 7',
      phoneNumber: '0161419845',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.8,
      nbeval: 217,
      prestation: [{ name: 'Balayage', prix: 60 }, { name: 'Ombré', prix: 70 }, { name: 'Coiffure', prix: 80 }, { name: 'Coiffure + Coupe', prix: 90 }, { name: 'Coiffure + Coupe + Couleur', prix: 100 }],
      lat: 48.86288113082472,
      lon: 2.3079469784673057
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494219/FindedApp/images_kbvflw.jpg',
      name: 'Valessio - Coiffeur Paris 11',
      email: 'valessio@gmail.com',
      description: 'Quand on parle des tendances et des techniques de balayage ou de mise en évidence de la couleur des cheveux, les différences sont parfois tellement nuancées qu’il est difficile de bien comprendre quoi choisir.',
      number: '152',
      address: 'rue de Charonne',
      zipcode: '75011',
      city: 'Paris 11',
      phoneNumber: '0161419845',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.5,
      nbeval: 420,
      prestation: [{ name: 'Balayage', prix: 60 }, { name: 'Ombré', prix: 70 }, { name: 'Coiffure', prix: 80 }, { name: 'Coiffure + Coupe', prix: 90 }, { name: 'Coiffure + Coupe + Couleur', prix: 100 }],
      lat: 48.85789378977654,
      lon: 2.3904100784673115
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494219/FindedApp/Coiffeur-1200x630_w2vxu3.jpg',
      name: 'Camille Albane - Coiffeur Paris 4ème',
      email: 'camillealbane@gmail.com',
      description: 'Grâce son emplacement idéal Boulevard Henri 4, le salon de coiffure Camille Albane compte parmi les établissements incontournables du quartier. Facile d’accès, votre coiffeur homme, femme et enfant est placé à côté du Quai Henri 4 et offre des prestations de qualité à sa clientèle.',
      number: '4',
      address: 'Bd Henri IV',
      zipcode: '75004',
      city: 'Paris 4',
      phoneNumber: '0161419845',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.8,
      nbeval: 42,
      prestation: [{ name: 'La coupe de cheveux et coiffure homme', prix: 35 }, { name: 'La coupe de cheveux et coiffure femme', prix: 40 }, { name: 'La coupe de cheveux et coiffure enfant', prix: 45 }],
      lat: 48.85348889810555,
      lon: 2.362085953543738
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest1_jpphwl.jpg',
      name: "Yonathan's - Coloriste Expert à Paris",
      email: 'yonathan@gmail.com',
      description: 'Coiffeur à Paris 12, Yonathan’s met à votre disposition son expertise en matière de coiffure. Dans un espace moderne et confortable, Jonathan et son équipe vous proposent de profiter des prestations d’un coiffeur-visagiste formé auprès de professionnels réputés.',
      number: '22',
      address: 'rue Taine',
      zipcode: '75012',
      city: 'Paris 12',
      phoneNumber: '0161419845',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.5,
      nbeval: 153,
      prestation: [{ name: 'Couleur', prix: 30 }, { name: 'Coiffure', prix: 40 }, { name: 'Coiffure + Coupe', prix: 50 }, { name: 'Coiffure + Coupe + Couleur', prix: 60 }],
      lat: 48.84094977724192,
      lon: 2.3928133375517415
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest15_tfbogj.jpg',
      name: "Dessange Saint Germain des Prés - Paris 6",
      email: 'dessange@gmail.com',
      description: 'Coiffeur à Paris 12, Yonathan’s met à votre disposition son expertise en matière de coiffure. Dans un espace moderne et confortable, Jonathan et son équipe vous proposent de profiter des prestations d’un coiffeur-visagiste formé auprès de professionnels réputés.',
      number: '15',
      address: 'rue des Saints-Pères',
      zipcode: '75006',
      city: 'Paris 6',
      phoneNumber: '0161419845',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 4.8,
      nbeval: 527,
      prestation: [{ name: 'Préparation mariage', prix: 130 }, { name: 'Coupe de cheveux', prix: 40 }, { name: 'Coiffure', prix: 50 }, { name: 'Coiffure + Coupe', prix: 60 }, { name: 'Coiffure + Coupe + Couleur', prix: 70 }],
      lat: 48.85990269231379,
      lon: 2.332913700348481
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest16_vid5f1.jpg',
      name: "Le Ludi",
      email: 'leludi@gmail.com',
      description: 'Coiffeur à Paris 12, Yonathan’s met à votre disposition son expertise en matière de coiffure. Dans un espace moderne et confortable, Jonathan et son équipe vous proposent de profiter des prestations d’un coiffeur-visagiste formé auprès de professionnels réputés.',
      number: '15',
      address: 'rue des Saints-Pères',
      zipcode: '75006',
      city: 'Paris 06',
      phoneNumber: '0161419845',
      category: 'haircut',
      categoryName: 'Coiffeur',
      note: 5.0,
      nbeval: 24,
      prestation: [{ name: 'Coupe de cheveux', prix: 40 }, { name: 'Coiffure', prix: 50 }, { name: 'Coiffure + Coupe', prix: 60 }, { name: 'Coiffure + Coupe + Couleur', prix: 70 }],
      lat: 48.76496869349106,
      lon: 2.3593605699930147
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494042/FindedApp/creer-une-entreprise-de-peinture-en-batiment_rylxbl.jpg',
      name: "Artisan Peintre Paris-Peinture D'interieur Paris",
      email: 'parispeintre@gmail.com',
      description: "Pascal Leplat à Paris 9ème c'est le spécialiste de la peinture et des revêtements muraux. Nos artisans peintres et plâtriers possèdent toutes les compétences pour sublimer vos surfaces et vous aider à imprimer votre emprunte et votre cachet dans votre habitat.",
      number: '26',
      address: 'rue Bellefond',
      zipcode: '75008',
      city: 'Paris 08',
      phoneNumber: '0161419845',
      category: 'peinture',
      categoryName: 'Peintre',
      note: 4.7,
      nbeval: 654,
      prestation: [{ name: 'Rénovation peinture', prix: 30 }, { name: 'Peinture murale', prix: 60 }, { name: 'Peinture murale + revêtement', prix: 100 }],
      lat: 48.880953678458816,
      lon: 2.3468857571944888
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494042/FindedApp/peintre-en-batiment_fknu3a.jpg',
      name: "ION BTP",
      email: 'ionbtp@gmail.com',
      description: 'Spécialiste dans la rénovation de la peinture et du revêtement de murs, ION BTP vous propose des prestations de qualité et de professionnalisme. Notre équipe de professionnels vous accompagne dans la réalisation de vos projets de rénovation de murs et de peinture.',
      number: '7',
      address: 'rue Danton',
      zipcode: '75006',
      city: 'Paris 06',
      phoneNumber: '0161419845',
      category: 'peinture',
      categoryName: 'Peintre',
      note: 4.5,
      nbeval: 98,
      prestation: [{ name: 'Peinture murale', prix: 30 }, { name: 'Peinture sol', prix: 40 }, { name: 'Peinture bois', prix: 50 }],
      lat: 48.85543427239532,
      lon: 2.3420792390256397
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494043/FindedApp/prix-dun-peintre-en-batiment_rhxygf.jpg',
      name: "9Renovation Entreprise de peinture",
      email: '9renov@gmail.com',
      description: "Vous avez un projet de création ou de rénovation d'intérieur? La société 9renovation est une entreprise dynamique et réactive, spécialisée dans les travaux de peinture intérieure, à Paris et en Ile-de-France.",
      number: '11',
      address: 'rue des Bauches',
      zipcode: '75016',
      city: 'Paris 16',
      phoneNumber: '0161419845',
      category: 'peinture',
      categoryName: 'Peintre',
      note: 4.1,
      nbeval: 5,
      prestation: [{ name: 'Peinture murale', prix: 30 }, { name: 'Peinture sol', prix: 40 }, { name: 'Peinture bois', prix: 50 }],
      lat: 48.85803197488555,
      lon: 2.2753029648791046
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652818114/FindedApp/miniatest17_pohp90.jpg',
      name: "Bati renov' Paris 18",
      email: 'batirenov@gmail.com',
      description: "Bati renov' Paris 18 est une entreprise de rénovation de batiments. Nous vous proposons des prestations de qualité et de professionnalisme. Notre équipe de professionnels vous accompagne dans la réalisation de vos projets de rénovation de murs et de peinture.",
      number: '110',
      address: 'rue Championnet',
      zipcode: '75018',
      city: 'Paris 18',
      phoneNumber: '0161419845',
      category: 'peinture',
      categoryName: 'Peintre',
      note: 4.6,
      nbeval: 173,
      prestation: [{ name: 'Restauration de peinture', prix: 30 }, { name: 'Peinture murale', prix: 60 }, { name: 'Peinture murale + revêtement', prix: 100 }],
      lat: 48.89867410113913,
      lon: 2.340362625876201
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494108/FindedApp/m%C3%A9tier-du-serrurier_g9uyjb.jpg',
      name: "Serrurerie Letellier et Fils",
      email: 'letellierfils@gmail.com',
      description: "SERRURERIE LETELLIER ET FILS est une entreprise spécialisée dans la réparation et la maintenance de serrures. Nous vous proposons des prestations de qualité et de professionnalisme.",
      number: '16',
      address: 'rue du Champ de Mars',
      zipcode: '75007',
      city: 'Paris 07',
      phoneNumber: '0161419845',
      category: 'trou-de-serrure',
      categoryName: 'Serrurier',
      note: 4.4,
      nbeval: 142,
      prestation: [{ name: 'Forcage de serrures', prix: 30 }, { name: 'Installation de serrures', prix: 50 }, { name: 'Installation de serrures + revêtement', prix: 70 }],
      lat: 48.88376521936633,
      lon: 2.364738522215522
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest4_yoqnq9.jpg',
      name: "Comptoir Des Serruriers - PICARD SERRURES",
      email: 'picardserru@gmail.com',
      description: "Comptoire Des Serruriers s'occupe de la réparation et de la maintenance de vos serrures. Nous vous proposons des prestations de qualité et de professionnalisme.",
      number: '17',
      address: 'rue Lagrange',
      zipcode: '75005',
      city: 'Paris 05',
      phoneNumber: '0161419845',
      category: 'trou-de-serrure',
      categoryName: 'Serrurier',
      note: 4.8,
      nbeval: 111,
      prestation: [{ name: 'Réparation de serrures', prix: 30 }, { name: 'Installation de serrures', prix: 50 }, { name: 'Installation de serrures + revêtement', prix: 70 }],
      lat: 48.853955336993465,
      lon: 2.348774015440414
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652817694/FindedApp/miniatest14_e0pfqz.jpg',
      name: "Serrurerie TAN",
      email: 'tanserr@gmail.com',
      description: "Serrurerie TAN est une entreprise de rénovation de serrures. Nous vous proposons des prestations de qualité et de professionnalisme.",
      number: '213',
      address: 'rue du Faubourg Saint-Martin',
      zipcode: '75010',
      city: 'Paris 10',
      phoneNumber: '0161419845',
      category: 'trou-de-serrure',
      categoryName: 'Serrurier',
      note: 4.9,
      nbeval: 815,
      prestation: [{ name: 'Forcage de serrures', prix: 30 }, { name: 'Installation de serrures', prix: 50 }, { name: 'Installation de serrures + revêtement', prix: 70 }],
      lat: 48.88376521936633,
      lon: 2.364738522215522
    },
    {
      images: 'https://res.cloudinary.com/dktfcexev/image/upload/v1653494593/FindedApp/serrurier-lille_annyo4.jpg',
      name: "Sefepar",
      email: 'sefepar@gmail.com',
      description: "Serrurerie TAN est une entreprise de rénovation de serrures. Nous vous proposons des prestations de qualité et de professionnalisme.",
      number: '49',
      address: 'rue des Batignolles',
      zipcode: '75017',
      city: 'Paris 17',
      phoneNumber: '0161419845',
      category: 'trou-de-serrure',
      categoryName: 'Serrurier',
      note: 4.7,
      nbeval: 248,
      prestation: [{ name: 'Réparation de serrures', prix: 30 }, { name: 'Installation de serrures', prix: 50 }, { name: 'Installation de serrures + revêtement', prix: 70 }],
      lat: 48.888618935186784,
      lon: 2.3189049310413825
    },

  ]

  for (let i = 0; i < fakeTableau.length; i++) {
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
  var searchUser = await userModel.findOne({ token: token })
  if (searchUser) {

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
    res.json({ result: true, reservation: searchUser.reservations[searchUser.reservations.length - 1] })
  } else {
    res.json({ result: false })
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
  var searchUser = await userModel.findOne({ token: token })
  let result = false

  if (searchUser) {

    for (let i = 0; i < searchUser.reservations.length; i++) {

      if (searchUser.reservations[i].id == req.body.id) {
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
