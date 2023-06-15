const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { get } = require('mongoose');
const argon2 = require('argon2');

router.use(cors());
router.use(express.json());

// Route de connexion de l'administrateur
const ash = '$argon2i$v=19$m=16,t=2,p=1$MzZ4REpxY3puOUtDcXI1QQ$h/10mOSER8digwhHDEdn9g';
router.post('/', (req, res) => {
    const id = jwt.decode(req.body.token, ash)?.user?._id;

    if (id) {

        const user = User.findOne({ _id: id }).then(user => {
            res.json(true);
        });

    } else if (!id && req.body.userName) {

        const user = User.findOne({ loginId: req.body.userName }).then(user => {
            if (user) {
                const password = user.password; // Récupération du mot de passe de l'objet
                const hash = argon2.hash(req.body.password).then(hash => {
                    // Comparaison du mot de passe fourni avec celui récupéré
                    if (argon2.verify(password, hash)) {
                        const token = jwt.sign(
                            { user: { _id: user._id } },
                            ash,
                        );
                        res.json({ token });
                    }
                });
            }
        });

    }

});



module.exports = router;
