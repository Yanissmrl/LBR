const mongoose = require('mongoose');


const menuSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    category: { type: String, required: true },
    // category = "plat" || "boisson"
    type: String,
    // type = asiatique || italienne || française || mexicaine || indienne || américaine || végétarienne
    allergens: Array,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;