const User = require('../models/User')

const dayjs = require('dayjs')

exports.createUser = async (req, res, next) => {
    const {dateOfBirth} = req.body
    console.log('body ', req.body)
    console.log('params ',req.params)
    const user = await User.create({
        ...req.body,
        dateOfBirth: new Date(dayjs(dateOfBirth, 'DD-MM-YYYY'))
    })
    res.send(user)
}

exports.readAllUser = async(req, res, next) => {
    const users = await User.findAll()
    return users
}

exports.readOneUser = (req, res, next) => {
    
}