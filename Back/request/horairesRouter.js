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
        AvailablePlaces: req.body.AvailablePlaces,
    });
    horaire.save()
        .then(() => res.status(201).json({ message: 'Horaire created !' }))
        .catch(error => res.status(400).json({ error }));
});

// GET all horaires

router.get('/', (req, res) => {


    Horaires.find()
        .then(horaires => {
            const datee = new Date()
            const date = horaires.filter((item) => item.day.getDate() >= datee.getDate())
            const horaire = date.sort((a, b) => a.day - b.day
            )
            return (
                res.status(200).json(horaire)
            )
        }
        )
        .catch(error => res.status(404).json({ error }));
});

// PUT one horaire

router.put('/:id', (req, res) => {
    Horaires.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id },
        () => Horaires.find((err, horaires) => {
            if (err) {
                res.status(404).json({ err })
            };
            res.status(200).json({ horaires })
        }));

});


module.exports = router;