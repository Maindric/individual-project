var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);
const jsonFile = require('../test-data.json');

const {attachPaginate} = require('knex-paginate');
attachPaginate();

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


router.get('/collection/:page', function(req, res, next) {
    const pageNumber = Number(req.params.page);
    console.log('Page:', req.params.page);
    knex('collection')
        .select('*')
        .orderBy(['title', 'format', 'volume'])
        .paginate({ perPage: 20, currentPage: pageNumber, isLengthAware: true})
        .then(data => {
            const currentPage = {
                totalPages:data.pagination.lastPage,
                currentPage : {
                    pageNumber:data.pagination.currentPage,
                    collection:data.data
                },
            }
            res.status(200).send(currentPage)
        });
});

router.delete('/delete/:id', function(req, res, next) {
    console.log("Deleting", req.params.id);
    knex('collection')
        .where({id: Number(req.params.id)})
        .del()
        .then(_ => res.status(200).end())
        .catch(e => {
            console.log(e);
            res.status(500).end()}
        )
})

router.patch('/update/:id', function(req, res, next) {
    console.log(req.params.id, req.body);
    knex('collection')
        .where({id: Number(req.params.id)})
        .update(req.body, ['id', 'title', 'interest'])
        .then(data => console.log(data))
    res.status(200).end();
})

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
        .where({title: newItem.title, format: newItem.format, volume: newItem.volume})
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