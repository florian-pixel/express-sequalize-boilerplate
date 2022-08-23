const express = require('express')
const {createUser, readAllUser, readOneUser, updateUser, deleteUser} = require('../controllers/user')
const  { authentication } = require('../middleware/auth')

const userRouter = express.Router()


userRouter.post('/', createUser)
userRouter.get('/', authentication, readAllUser)
userRouter.get('/:id', readOneUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter