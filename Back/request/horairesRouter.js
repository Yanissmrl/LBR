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
        .then(() => res.status(201).json({ message: 'Horaire created !' }))
        .catch(error => res.status(400).json({ error }));
});

router.put('/:id', async (req, res) => {
    const horaire = await Horaires.findById(req.params.id);
    const newFirstAvailablePlaces = horaire.firstAvailablePlaces - req.body.firstAvailablePlaces;
    const newSecondAvailablePlaces = horaire.secondAvailablePlaces - req.body.secondAvailablePlaces;
    if (newFirstAvailablePlaces < 0) {
        try {
            await horaire.updateOne({
                $set: {
                    firstAvailablePlaces: 0,
                    secondAvailablePlaces: newSecondAvailablePlaces,
                }
            }, { new: true });
            res.status(200).json(horaire);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else if (newSecondAvailablePlaces < 0) {
        try {
            await horaire.updateOne({
                $set: {
                    firstAvailablePlaces: newFirstAvailablePlaces,
                    secondAvailablePlaces: 0,
                }
            }, { new: true });
            res.status(200).json(horaire);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        try {
            await horaire.updateOne({
                $set: {
                    firstAvailablePlaces: newFirstAvailablePlaces,
                    secondAvailablePlaces: newSecondAvailablePlaces,
                }
            }, { new: true });
            res.status(200).json(horaire);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
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


                    horaires.forEach(horaire => {
                        const i = 0;
                        // console.log("log de getTime horaire ", horaire.day.getTime());
                        // console.log("log de getTime resa ", new Date(resa[0].day).getTime());

                        if (horaire.day.getTime() === new Date(resa[i].day).getTime()) {
                            console.log('day est =');

                            let isHourValid = false;
                            // console.log("log de mH", horaire.morningH);
                            const firstHour = new Date(horaire.morningH);

                            const datePart1 = `${firstHour.getFullYear()}-${firstHour.getMonth() + 1}-${firstHour.getDate()}T${firstHour.getHours()}:${firstHour.getMinutes()}`;
                            console.log("part 1", datePart1);

                            const secondHour = new Date(horaire.eveningH);

                            const datePart2 = `${secondHour.getFullYear()}-${secondHour.getMonth() + 1}-${secondHour.getDate()}T${secondHour.getHours()}:${secondHour.getMinutes()}`;
                            console.log("part 2", datePart2);

                            const resaHour = resa[i].hour;
                            console.log("log de resa[i].hour ", `${resaHour.getFullYear()}-${resaHour.getMonth() + 1}-${resaHour.getDate()}T${resaHour.getHours()}:${resaHour.getMinutes()}`);
                            const resaFormatted = `${resaHour.getFullYear()}-${resaHour.getMonth() + 1}-${resaHour.getDate()}T${resaHour.getHours()}:${resaHour.getMinutes()}`;

                            if (datePart1.includes(resaFormatted) || datePart2.includes(resaFormatted)) {
                                // Si la date contenue dans "resaFormatted" est égale à l'une des dates contenues dans "datePart1" ou "datePart2" 
                                isHourValid = true;
                                console.log('isHourValid true :', isHourValid);

                                // filter pour supprimer les heures de datePart1 qui sont egales a resaFormatted
                                console.log("datePart1", datePart1);
                                const newDatePart1 = datePart1.filter((item) => item != resaFormatted);
                                console.log("newDatePart1", newDatePart1);
                                // filter pour supprimer les heures de datePart2 qui sont egales a resaFormatted
                                const newDatePart2 = datePart2.filter((item) => item !== resaFormatted);
                                // console.log("newDatePart2", newDatePart2);



                            } else {
                                console.log('isHourValid falses :', isHourValid);
                            }

                        } else {
                            console.log('day est pas =');
                        }

                    });



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