const express = require('express');
const router = express.Router();
const cors = require('cors');
const Horaires = require('../model/horaires');
const ResaClient = require('../model/reservationClient');

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
        .then(horaire => res.status(201).json({ message: 'Horaire created !', data: horaire }))
        .catch(error => res.status(400).json({ error }));
});
// router.post('/', (req, res) => {
//     const horaire = new Horaires({
//         day: req.body.day,
//         morningH: req.body.morningH,
//         eveningH: req.body.eveningH,
//         firstAvailablePlaces: req.body.firstAvailablePlaces,
//         secondAvailablePlaces: req.body.secondAvailablePlaces,
//     });

//     horaire.save()
//         .then(horaire => {
//             const response = { message: 'Horaire created!', data: horaire };
//             console.log('Backend response:', response);
//             res.status(201).json(response);
//         })
//         .catch(error => res.status(400).json({ error }));
// });

// delet a horaire

router.delete('/:id', async (req, res) => {
    try {
        const horaire = await Horaires.findById(req.params.id);
        await horaire.deleteOne();
        res.status(200).json({ message: 'Horaire deleted !' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const horaire = await Horaires.findById(req.params.id);

        if (req.body.page === 'resaChoice') {
            let newFirstAvailablePlaces = horaire.firstAvailablePlaces || 0;
            let newSecondAvailablePlaces = horaire.secondAvailablePlaces || 0;

            newFirstAvailablePlaces -= req.body.firstAvailablePlaces || 0;
            newSecondAvailablePlaces -= req.body.secondAvailablePlaces || 0;

            newFirstAvailablePlaces = newFirstAvailablePlaces < 0 ? 0 : newFirstAvailablePlaces;
            newSecondAvailablePlaces = newSecondAvailablePlaces < 0 ? 0 : newSecondAvailablePlaces;

            await horaire.updateOne({
                $set: {
                    day: req.body.day,
                    firstAvailablePlaces: newFirstAvailablePlaces,
                    secondAvailablePlaces: newSecondAvailablePlaces,
                    eveningH: req.body.eveningH,
                    morningH: req.body.morningH,
                }
            }, { new: true });
        } else {
            await horaire.updateOne({
                $set: {
                    day: req.body.day,
                    firstAvailablePlaces: req.body.firstAvailablePlaces,
                    secondAvailablePlaces: req.body.secondAvailablePlaces,
                    eveningH: req.body.eveningH,
                    morningH: req.body.morningH,
                }
            }, { new: true });
        }

        res.status(200).json(horaire);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.get('/', (req, res) => {

    // Première requête
    Horaires.find()
        .then(horaires => {
            const datee = new Date()
            const date = horaires.filter((item) => item.day.getDate() >= datee.getDate())
            const horaire = date.sort((a, b) => a.day - b.day)

            // Deuxième requête
            ResaClient.find()
                .then(resaClient => {
                    const day = new Date()
                    const dates = resaClient.filter((item) => {
                        const date = new Date(item.day)
                        return date
                    })
                    const resa = dates.sort((a, b) => a.date - b.date)
                    // le log return bien les obj de tt les resa prises 
                    // console.log("log de resa ", resa);


                    if (!horaire || !resa) {
                        console.log('rentre dans le if');
                        return res.status(204).end()
                    } else {
                        // console.log('rentre dans le else');
                        return res.status(200).json(horaire)
                    }
                })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
});


module.exports = router;