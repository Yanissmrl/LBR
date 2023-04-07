const mongoose = require('mongoose');


const resaAdminSchema = mongoose.Schema({
    // partie admin
    day: { type: Date, required: true },
    place: { type: Number, required: true },
    // pour le nombre de places libres creer ligne places libres à la place de "place" et place totale qui seras en statique dans le code mais qu'on pourras changer dans l'admin et pour l'affichage dans le front des places dispo faire un calc qui deduis des places qui ont deja été prises pour savoir cmb il en reste de dispo 
});

const ResaAdmin = mongoose.model('ResaAdmin', resaAdminSchema);

module.exports = ResaAdmin;