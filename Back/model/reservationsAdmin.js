const mongoose = require('mongoose');


const resaAdminSchema = mongoose.Schema({
    // partie admin
    day: { type: String, required: true },
    place: { type: Number, required: true },
});

const ResaAdmin = mongoose.model('ResaAdmin', resaAdminSchema);

module.exports = ResaAdmin;