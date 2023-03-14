const express = require('express');
const router = express.Router();
const cors = require('cors');
const ResaAdmin = require('../model/reservationsAdmin');

router.use(cors());
router.use(express.json());

// create a new horaire

router.post('/', (req, res) => {
    const resaAdmin = new ResaAdmin({
        day: req.body.day,
        place: req.body.place,
        name: req.body.name,
    });
    resaAdmin.save()
        .then(() => res.status(201).json({ message: 'Reservation Admin created !' }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;