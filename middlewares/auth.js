const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.protect = async (req, res, next) => {
    let token
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ msg: "Unauthorized !" });

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(" ")[1]
    }

    // if (req.cookies.token) token = req.cookies.token

    console.log("token", token)

    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.SECRET)
        if (!decoded) return res.status(401).json({ msg: "Unauthorized !" })

        req.user = await User.findByPk(decoded.id)

    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized !" })
    }

    return next()

}