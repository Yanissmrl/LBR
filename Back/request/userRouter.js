const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

router.use(cors());
router.use(express.json());

// Route de connexion de l'administrateur
router.post('/login', async (req, res) => {
    const { loginId, password } = req.body;

    try {
        // Vérifier si l'administrateur existe dans la base de données
        const admin = await User.findOne({ loginId });

        if (!admin) {
            return res.status(404).json({ message: "L'administrateur n'existe pas." });
        }

        // Vérifier si le mot de passe est correct
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer un jeton d'accès
        const token = jwt.sign({ loginId: admin.loginId, id: admin._id }, 'secret', {
            expiresIn: '1h',
        });

        // Retourner le jeton au client
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
});
// router.post('/', (req, res) => {
//     const user = new User({
//         loginId: req.body.loginId,
//         password: req.body.password
//     });
//     user.save()
//         .then(() => res.status(201).json({ message: 'User created !' }))
//         .catch(error => res.status(400).json({ error }));
// });

// get user by name
router.get('/:loginId', (req, res) => {
    console.log(req.params.loginId);
    
    User.findOne({ loginId: req.params.loginId })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
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