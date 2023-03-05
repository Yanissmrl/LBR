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

// get news by name
router.get('/:name', (req, res) => {
    News.findOne({ name: req.params.name })
        .then(news => res.status(200).json(news))
        .catch(error => res.status(404).json({ error }));
});

module.exports = router;