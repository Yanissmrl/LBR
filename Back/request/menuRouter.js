const express = require('express');
const router = express.Router();
const cors = require('cors');
const Menu = require('../model/menu');

router.use(cors());
router.use(express.json());

// create a new menu
router.post('/', (req, res) => {
    const menu = new Menu({
        name: req.body.name,
        price: req.body.price,
        entree: req.body.entree,
        plats: req.body.plats,
        desserts: req.body.desserts,
    });
    menu.save()
        .then(() => res.status(201).json({ message: 'Menu created !' }))
        .catch(error => res.status(400).json({ error }));
});

// GET all menu
router.get('/', (req, res) => {
    Menu.find()
        .then(menu => res.status(200).json(menu))
        .catch(error => res.status(404).json({ error }));
});

// GET one menu by name
router.get('/:name', (req, res) => {
    Menu.findOne({ name: req.params.name })
        .then(menu => res.status(200).json(menu))
        .catch(error => res.status(404).json({ error }));
});


module.exports = router;
