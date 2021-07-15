var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);
const jsonFile = require('../test-data.json');

router.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/collection', function(req, res, next) {
    knex('collection')
        .select('*')
        .then(data => res.status(200).send(data));
});

router.post('/new', function(req, res, next) {
    console.log("Post request recieved");
    const newItem = {
        title: req.body.title,
        format: req.body.format,
        volume: req.body.volume,
        interest: req.body.interest,
        image: req.body.image
    }
    knex('collection')
        .select('title')
        .where({title: newItem.title, format: newItem.format})
        .then(data => {
            if(data.length > 0)
            {
                console.log("Trying to add an existing entry.")
                res.status(406).send({message: "Entry already exists, data not acceptable"});
            } else {
                console.log("New entry added.");
                knex('collection')
                    .insert(newItem)
                    .returning('id')
                    .then(id => res.status(200).send(`Entry added at id:${id}`));
            }
        })
});

module.exports = router;