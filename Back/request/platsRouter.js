const express = require('express');
const router = express.Router();
const cors = require('cors');
const Plats = require('../model/plats');

router.use(cors());
router.use(express.json());

// create a new plats
router.post('/', (req, res) => {
    const plats = new Plats({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        type: req.body.type,
        allergens: req.body.allergens,
    });
    plats.save()
        .then(() => res.status(201).json({ message: 'Plats created !' }))
        .catch(error => res.status(400).json({ error }));
});

// get all name
router.get('/', (req, res) => {
    Plats.find()
        .then(plats => res.status(200).json(plats))
        .catch(error => res.status(404).json({ error }));
});
// get all category
router.get('/category', (req, res) => {
    Plats.find()
        .then(plats => res.status(200).json(plats))
        .catch(error => res.status(404).json({ error }));
});

// get all type
router.get('/type', (req, res) => {
    Plats.find()
        .then(plats => res.status(200).json(plats))
        .catch(error => res.status(404).json({ error }));
});

// get all allergens
router.get('/allergens', (req, res) => {
    Plats.find()
        .then(plats => res.status(200).json(plats))
        .catch(error => res.status(404).json({ error }));
});

module.exports = router;