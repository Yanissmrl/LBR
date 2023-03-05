const mongoose = require('mongoose');


const horairesSchema = mongoose.Schema({
    day: { type: String, required: true },
    morningH: { type: String, required: true },
    eveningH: { type: String, required: true }
});

const Horaires = mongoose.model('Horaires', horairesSchema);

module.exports = Horaires;