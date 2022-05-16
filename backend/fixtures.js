const mongoose = require("mongoose");
const professionalModel = require('./models/professionalData')
const bcryptjs = require("bcryptjs");
const config = require("./routes/config");

mongoose.connect(config.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => {
        console.log("DB fixtures connected");
    }
);

async function createUser() {
    await professionalModel.deleteMany({}).exec();
    await professionalModel.create([
        // {
        //     email: "duchesse@isis.com",
        //     password: bcryptjs.hashSync("Malory"),
        //     name: "Sterling",
        //     description: "Il est trop fort",
        //     address: "95 Bis Boulevard Richard Lenoir",
        //     phoneNumber: "0679554717"
        // },
        // {
        //     email: "duchesse@isis.com",
        //     password: bcryptjs.hashSync("Malory"),
        //     name: "Sterling",
        //     description: "Il est trop fort",
        //     address: "95 Bis Boulevard Richard Lenoir",
        //     phoneNumber: "0679554717"
        // },
        // {
        //     email: "duchesse@isis.com",
        //     password: bcryptjs.hashSync("Malory"),
        //     name: "Sterling",
        //     description: "Il est trop fort",
        //     address: "95 Bis Boulevard Richard Lenoir",
        //     phoneNumber: "0679554717"
        // },
        {
            images: '../assets/fakeminia/miniatest1.jpg',
            name: 'Coiffeur du perche',
            email: 'coiffduperche@gmail.com',
            password: bcryptjs.hashSync("averty"),
            description: 'Super coiffeur pres de vous ! Commandez votre prestation dès maitenant',
            number: '10',
            address: 'rue du perche',
            zipcode: '75017',
            city: 'Paris',
            phoneNumber: '0199989794',
            category: 'Coiffeur',
            isAvailable: true
        }
    ]);
    await console.log("users")
}
createUser();