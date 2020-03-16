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
  // knex('users').where({
  //   first_name: 'Test',
  //   last_name:  'User'
  // }).select('id')
  return db('posts')
    .where({ id })
    .select('id', 'title', 'contents')
}
// database access using knex END
router.get('/:id', async (req, res) => {
  try {
    const data = await getById(req.params.id)
    if (!data.length) {
      res.status(200).json({ message: `No post with id ${req.params.idÎ}`})
    } else {
      res.status(200).json(data)
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

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;