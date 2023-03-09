const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../model/user');

router.use(cors());
router.use(express.json());


// create a new user
router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then(() => res.status(201).json({ message: 'User created !' }))
        .catch(error => res.status(400).json({ error }));
});

// get user by name
router.get('/:name', (req, res) => {
    User.findOne({ name: req.params.name })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
});

module.exports = router;