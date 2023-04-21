const mongoose = require('mongoose');


const resaClientSchema = mongoose.Schema({
      // mettre name email persons hour dans un objet/tableau client
    day: { type: Date, required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    //nombre de personnes pour la réservation qui seras a comparer avec le nombre de places disponibles pour la date et l'heure choisie 
    persons: { type: Number, required: true },
    // choisir l'heure de resa selon les h d'ouverture et de fermeture
    hour: { type: Date, required: true },


});

const ResaClient = mongoose.model('ResaClient', resaClientSchema);

module.exports = ResaClient;