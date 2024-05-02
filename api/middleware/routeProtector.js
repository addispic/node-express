const jwt = require('jsonwebtoken')

// model
// user
const User = require('../models/usersModel')

// route protector
const routeProtector = async (req, res, next) => {
    try {
        // get token
        const token = req.cookies('token')
        console.log(token)
    } catch (err) {
        console.log(err)
        console.log('something wrong')
    }
    next()
}

// exports
module.exports = {
    routeProtector,
}