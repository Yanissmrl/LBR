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
        firstAvailablePlaces: req.body.firstAvailablePlaces,
        secondAvailablePlaces: req.body.secondAvailablePlaces,
    });
    horaire.save()
        .then(() => res.status(201).json({ message: 'Horaire created !' }))
        .catch(error => res.status(400).json({ error }));
});

router.put('/:id', async (req, res) => {
    const horaire = await Horaires.findById(req.params.id);
    try {
        await horaire.updateOne({
            $set: {
                firstAvailablePlaces: horaire.firstAvailablePlaces - req.body.firstAvailablePlaces,
                secondAvailablePlaces: horaire.secondAvailablePlaces - req.body.secondAvailablePlaces,
            }
        }, { new: true });
        res.status(200).json(horaire);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', (req, res) => {


    Horaires.find()
        .then(horaires => {
            const datee = new Date()
            const date = horaires.filter((item) => item.day.getDate() >= datee.getDate())
            const horaire = date.sort((a, b) => a.day - b.day)
            return (
                res.status(200).json(horaire)
            )
        }
        )
        .catch(error => res.status(404).json({ error }));
});

module.exports = router;