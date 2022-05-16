var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://benidiegodev:benibenibeni@benidiegodev.youor.mongodb.net/findedApp?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.error('Erreur de connexion à mongoDB : ' + err);
        } else {
            console.log('connecté à la DB')
        }
    }
)

module.exports = mongoose