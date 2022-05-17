var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://benidiegodev:benibenibeni@benidiegodev.youor.mongodb.net/findedAppBack2?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.error('Erreur de connexion à mongoDB : ' + err);
        } else {
            console.log('Connecté à la DB FindedAppBack2')
        }
    }
)

module.exports = mongoose