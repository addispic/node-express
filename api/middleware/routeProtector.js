const jwt = require('jsonwebtoken')

// model
// user
const User = require('../models/usersModel')

// route protector
const routeProtector = async (req, res, next) => {
    try {
        // get token
        const token = req.cookies.token

        if (!token) {
            res.status(401).json({
                error: 'unauthorized'
            })
            return
        }
        // decode token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        // user
        const user = await User.findById(decodedToken._id)

        if (!user) {
            res.status(401).json({
                error: 'unauthorized',
            })
            return
        }

        req.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
        next()
    } catch (err) {
        res.status(401).json({
            error: 'unauthorized'
        })
    }
}

// exports
module.exports = {
    routeProtector,
}