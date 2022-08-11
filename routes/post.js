const express = require('express')
const { createPost, readAllPost, readOnePost, updatePost, deletePost  } = require('../controllers/post')

const postRouter = express.Router()

postRouter.post('/', createPost)
postRouter.get('/', readAllPost)
postRouter.get('/:id', readOnePost)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id', deletePost)


module.exports = postRouter