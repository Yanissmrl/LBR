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

// get all reservationClient
router.get('/', (req, res) => {
    ResaClient.find()
        .then(resaClient => {
            console.log("resaClient ", resaClient);
            const day = new Date()
            const dates = resaClient.filter((item) => {
                const date = new Date(item.day)
                return date.getDate() === day.getDate()
            })
            const resa = dates.sort((a, b) => a.date - b.date
            )

            return (
                res.status(200).json(resa)
            )
        }
        )
        .catch(error => res.status(404).json({ error }));
});

module.exports = router;