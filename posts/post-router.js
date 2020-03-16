const express = require('express');
const router = express.Router();

// database access using knex START ===================================================
const db = require('../data/db-config.js');

function getAll() {
  // raw SQL: "SELECT id, title, contents FROM posts;"
  // search the knex docs for "SELECT"
  return db
    .select('id', 'title', 'contents')
    .from('posts')
}
function getById(id) {
  // raw SQL: "SELECT id, title, contents FROM posts WHERE id = 1;"
  // search the knex docs for "WHERE"
  return db('posts')
    .where({ id })
    .select('id', 'title', 'contents')
}
function create(post) {
  // raw SQL: "INSERT INTO posts (title, contents) values ('new post', 'have fun');"
  // search the knex docs for "INSERT"
  return db('posts')
    .insert(post)
}
function edit(id, post) {
  // raw SQL: "UPDATE posts SET title = 'updated post', contents = 'have more fun' WHERE id = 1;"
  // search the knex docs for "UPDATE"
  return db('posts')
    .where({ id })
    .update(post)
}
function remove(id) {
  // raw SQL: "DELETE FROM posts WHERE id = 1;"
  // search the knex docs for "DELETE"
  return db('posts')
    .where({ id })
    .del()
}
// database access using knex END ===================================================

router.post('/', async (req, res) => {
  try {
    const data = await create(req.body)
    res.status(200).json({ message: `A new post with id of ${data[0]} was created` })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Fatal error getting all posts' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await getById(req.params.id)
    if (!data.length) {
      res.status(200).json({ message: `No post with id ${req.params.id}` })
    } else {
      const data = await edit(req.params.id, req.body)
      res.status(200).json({ message: `${data} posts were affected` })
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

router.put('/:id', async (req, res) => {
  try {
    const data = await getById(req.params.id)
    if (!data.length) {
      res.status(200).json({ message: `No post with id ${req.params.id}` })
    } else {
      const data = await edit(req.params.id, req.body)
      res.status(200).json({ message: `${data} posts were affected` })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Fatal error getting post by id' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const data = await remove(req.params.id)
    if (!data.length) {
      res.status(200).json({ message: `No post with id ${req.params.id}` })
    } else {
      const data = await remove(req.param.id)
      res.status(200).json({ message: `${data} posts were affected` })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Fatal error getting post by id' })
  }
})

module.exports = router;