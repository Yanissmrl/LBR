const mongoose = require('mongoose');

const platsSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    category: { type: String, required: true },
    // category entree, plat, dessert
    type: String,
    // type viande, poisson, végétarien
    allergens: Array,
});

const Plats = mongoose.model('Plats', platsSchema);

module.exports = Plats;