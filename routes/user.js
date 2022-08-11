const express = require('express')
const {createUser, readAllUser, readOneUser, updateUser, deleteUser} = require('../controllers/user')

const userRouter = express.Router()


userRouter.post('/', createUser)
userRouter.get('/', readAllUser)
userRouter.get('/:id', readOneUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter