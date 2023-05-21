const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { get } = require('mongoose');

router.use(cors());
router.use(express.json());

// Route de connexion de l'administrateur
const ash = 'Yaniss12341';

router.post('/', (req, res) => {
    console.log(req.body.userName, req.body.password);
    const id = jwt.decode(req.body.token, ash)?.user?._id;

    if (id) {

        const user = User.findOne({ _id: id }).then(user => {
            console.log('token');
            res.json(true);
        });

    } else if (!id && req.body.userName && req.body.password) {

        const user = User.findOne({ loginId: req.body.userName, password: req.body.password })
            .then(user => {
                if (user?._id) {
                    console.log(user.id);
                    const token = jwt.sign(
                        { user: { _id: user._id } },
                        ash,
                    );
                    console.log('pas token');
                    res.json({ token });
                    console.log(token);
                }
            });
    }

});



module.exports = router;
// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const User = require('../model/user');

// router.use(cors());
// router.use(express.json());


// router.post('/', (req, res) => {
//     const user = new User({
//         loginId: req.body.loginId,
//         password: req.body.password
//     });
//     user.save()
//         .then(() => res.status(201).json({ message: 'User created !' }))
//         .catch(error => res.status(400).json({ error }));
// });


// module.exports = router;