const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://admin:password@localhost:27017', {dbName: 'La-Brick-Rouge'} )
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));