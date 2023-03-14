const mongoose = require('mongoose');


const horairesSchema = mongoose.Schema({
    day: { type: String, required: true },
    morningH: { type: Array, required: true },
    eveningH: { type: Array, required: true }
});

const Horaires = mongoose.model('Horaires', horairesSchema);

module.exports = Horaires;