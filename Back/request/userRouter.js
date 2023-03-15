const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../model/user');

router.use(cors());
router.use(express.json());


// create a new user
router.post('/', (req, res) => {
    const user = new User({
        loginId: req.body.loginId,
        password: req.body.password
    });
    user.save()
        .then(() => res.status(201).json({ message: 'User created !' }))
        .catch(error => res.status(400).json({ error }));
});

// get user by name
router.get('/:loginId', (req, res) => {
    User.findOne({ loginId: req.params.loginId })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
});

// get all users
router.get('/', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;