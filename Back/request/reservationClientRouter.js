const express = require('express');
const router = express.Router();
const cors = require('cors');
const ResaClient = require('../model/reservationClient');

router.use(cors());
router.use(express.json());

// create a new horaire

router.post('/', (req, res) => {
    const resaClient = new ResaClient({
        day: req.body.day,
        name: req.body.name,
        email: req.body.email,
        persons: req.body.persons,
        hour: req.body.hour,
    });
    resaClient.save()
        .then(() => res.status(201).json({ message: 'Reservation client created !' }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;