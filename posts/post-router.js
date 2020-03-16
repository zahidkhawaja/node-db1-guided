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
  return db
    
}
// database access using knex END
router.get('/:id', async (req, res) => {
  try {
    const data = await getById(req.params.id)
    res.status(200).json(data)
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

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;