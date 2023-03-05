const express = require('express');
const router = express.Router();
const cors = require('cors');
const Horaires = require('../model/horaires');

router.use(cors());
router.use(express.json());

// create a new horaire

router.post('/', (req, res) => {
    const horaire = new Horaires({
        day: req.body.day,
        morningH: req.body.morningH,
        eveningH: req.body.eveningH,
    });
    horaire.save()
        .then(() => res.status(201).json({ message: 'Horaire created !' }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;