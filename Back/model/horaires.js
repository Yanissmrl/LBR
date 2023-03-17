const mongoose = require('mongoose');


const horairesSchema = mongoose.Schema({
    day: { type: Date, required: true },
    morningH: { type: Array, required: true },
    eveningH: { type: Array, required: true },
    place: { type: Number, required: true }
});

const Horaires = mongoose.model('Horaires', horairesSchema);

module.exports = Horaires;