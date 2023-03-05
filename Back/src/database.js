const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // avoid warning message

mongoose.connect('mongodb://admin:password@localhost:27017')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));