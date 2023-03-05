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
        description: req.body.description,
        image: req.body.image,
    });
    menu.save()
        .then(() => res.status(201).json({ message: 'Menu created !' }))
        .catch(error => res.status(400).json({ error }));
});

// get all name
router.get('/', (req, res) => {
    Menu.find()
        .then(menu => res.status(200).json(menu))
        .catch(error => res.status(404).json({ error }));
});
// get all category
router.get('/category', (req, res) => {
    Menu.find()
        .then(menu => res.status(200).json(menu))
        .catch(error => res.status(404).json({ error }));
});

// get all type
router.get('/type', (req, res) => {
    Menu.find()
        .then(menu => res.status(200).json(menu))
        .catch(error => res.status(404).json({ error }));
});

// get all allergens
router.get('/allergens', (req, res) => {
    Menu.find()
        .then(menu => res.status(200).json(menu))
        .catch(error => res.status(404).json({ error }));
});


module.exports = router;
