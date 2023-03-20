const express = require('express');
const router = express.Router();
const cors = require('cors');
const News = require('../model/news');

router.use(cors());
router.use(express.json());


// create a new news
router.post('/', (req, res) => {
    const news = new News({
        name: req.body.name,
        image: req.body.image,
        info: req.body.info,
        date: req.body.date
    });
    news.save()
        .then(() => res.status(201).json({ message: 'News created !' }))
        .catch(error => res.status(400).json({ error }));
});
// get all news
router.get('/', (req, res) => {
    News.find()

        .then(news => {
            const day = new Date()
            const dates = news.filter((item) => item.date >= day)
            const event = dates.sort((a, b) => a.date - b.date
            )
            console.log("jsp", dates);

            return (
                res.status(200).json(event)
            )
        }
        )
        .catch(error => res.status(400).json({ error }));
});


module.exports = router;