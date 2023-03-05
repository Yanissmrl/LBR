const mongoose = require('mongoose');


const newsSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    info: String,
    date: Date,

});

const News = mongoose.model('News', newsSchema);

module.exports = News;