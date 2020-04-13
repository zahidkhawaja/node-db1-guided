const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('posts')
    .then(posts => {
        res.status(200).json({data: posts})
    }).catch(error => {
        console.log(error);
        res.status(500).json({error: error.message })
    });
});

router.get('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    // .where('id', req.params.id)
    // .first()
    .then(post => {
        res.status(200).json({data: post})
    .catch(error => {
        res.status(500).json({error: error.message})
    })
    })
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;