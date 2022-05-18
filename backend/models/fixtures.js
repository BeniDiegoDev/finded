const mongoose = require("mongoose");
const userModel = require("./usersModel");
var bcrypt = require('bcrypt');

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology : true,
  useNewUrlParser: true,
}
mongoose.connect(
  "mongodb+srv://benidiegodev:benibenibeni@benidiegodev.youor.mongodb.net/findedAppBack2?retryWrites=true&w=majority",
  options,
  function (err) {
    if (err) {
      console.error("Erreur de connexion à mongoDB : " + err);
    } else {
      console.log("Fixtures connecté à la DB FindedAppBack2");
    }
  }
);

async function createUser() {
  await userModel.deleteMany({}).exec();
  await userModel.create([
    {
      profilePicture: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      firstName: "James",
      lastName: "BROWN",
      email: "jamesbrown@gmail.com",
      password: bcrypt.hashSync('dayrghauij', 10),
      number: "15",
      address: "rue de la paix",
      ZIP: "93240",
      city: "Stains",
      phoneNumber: "0123456789",
      reservations: "Babysitter",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
    {
      profilePicture: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      firstName: "Mickel",
      lastName: "WHITE",
      email: "mwhite@gmail.com",
      password: bcrypt.hashSync('dayrghauij', 10),
      number: "20",
      address: "rue du coin",
      ZIP: "75019",
      city: "Paris",
      phoneNumber: "0633466789",
      reservations: "Coiffeur",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
    {
      profilePicture: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      firstName: "Maurice",
      lastName: "GREEN",
      email: "mgreen@gmail.com",
      password: bcrypt.hashSync('dayrghauij', 10),
      number: "30",
      address: "rue de l'horizon",
      ZIP: "93310",
      city: "Le Pré Saint Gervais",
      phoneNumber: "0633456789",
      reservations: "Plombier",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
    {
      profilePicture: 'https://res.cloudinary.com/dktfcexev/image/upload/v1652779424/FindedApp/miniatest2_myaxoo.jpg',
      firstName: "Rose",
      lastName: "BRUME",
      email: "rb@gmail.com",
      password: bcrypt.hashSync('dayrghauij', 10),
      number: "80",
      address: "Allée des voyageurs",
      ZIP: "91150",
      city: "Etampes",
      phoneNumber: "0657253690",
      reservations: "Mécanicien",
      messages: "Bonjour, où êtes-vous exactement ? Merci.",
      conversations: "",
      note: "5",
    },
  ]);
}
createUser();
