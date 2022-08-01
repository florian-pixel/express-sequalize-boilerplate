const express = require('express')
const {createUser, readAllUser} = require('../controllers/user')

const router = express.Router()


router.post('/users/create', createUser)
router.get('/users/readAll', readAllUser)
router.put('/users/update', (req, res, next) => {

})
router.delete('/users/delete', (req, res, next) => {

})