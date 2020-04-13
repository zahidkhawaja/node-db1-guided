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
    const postData = req.body;
    db('posts')
    // the second 'id' argument causes a warning and isn't needed for sqlite, but it's needed for other databases. So we keep it.
    .insert(postData, 'id')
    .then(ids => {
        // insert returns an array that contains the id of what we inserted
        const id = ids[0];
        db('posts')
        .where({ id })
        .first().then(post => {
            res.status(200).json({data: post})
        })
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
});

router.patch('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('posts').where( {id} ).update(changes)
    .then(count => {
        count > 0 ? res.status(200).json({ message: "Update successful"}) : res.status(404).json({ message: "No posts with that ID found"})
    })
});

router.delete('/:id', (req, res) => {
    db('posts').where('id', req.params.id).del()
    // .del() returns the number of items deleted
    .then(num => {
        res.status(200).json(num)
    })
    .catch(error => {
        res.status(500).json({ error: error.message})
    })
});

module.exports = router;