const express = require('express');
const router = express.Router();

// database access using knex START
const db = require('../data/db-config.js');

function getAll() {
  return db
    .select('id', 'title', 'contents')
    .from('posts')
}
function getById(id) {
  return db('posts')
    .where({ id })
    .select('id', 'title', 'contents')
}
function create(post) {
  return db('posts')
    .insert(post)
}
// database access using knex END
router.post('/', async (req, res) => {
  try {
    const data = await create(req.body)
    res.status(200).json({ message: `A new post with id of ${data[0]} was created`})
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Fatal error getting all posts' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await getById(req.params.id)
    if (!data.length) {
      res.status(200).json({ message: `No post with id ${req.params.id}`})
    } else {
      res.status(200).json(data[0])
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Fatal error getting post by id' })
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await getAll()
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Fatal error getting all posts' })
  }
})

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;