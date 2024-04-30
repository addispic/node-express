const bcryptjs = require('bcryptjs')
// db
// users
const User = require('../models/usersModel')

// utils
// user utils
const {
    MAX_AGE,
    errorHandler,
    generateToken,
} = require('../utils/usersUtils')

// login
const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username?.trim()) {
            throw new Error('username required')
        }
        if (!password) {
            throw new Error('password required')
        }

        const user = await User.findOne({ username })

        if (!user) {
            throw new Error('user not exist')
        }

        // is password match 
        const isPasswordMatch = bcryptjs.compareSync(password, user.password)

        if (!isPasswordMatch) {
            throw new Error('incorrect password')
        }

        // token
        const token = generateToken(user._id)
        // cookies
        res.cookie('token', token, {
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        })
        res.status(200).json({ _id: user._id, username: user.username, email: user.email })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({
            errors
        })
    }
}

// signup
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await User.create({ username, email, password })
        // token
        const token = generateToken(user._id)
        // cookies
        res.cookie('token', token, {
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        })
        res.status(200).json({ _id: user._id, username: user.username, email: user.email })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({
            errors
        })
    }
}

// logout
const logout = (req, res) => {
    try {
        res.cookie('token', '', {
            maxAge: 1
        })
        res.status(200).json({
            message: 'logout successfully'
        })
    } catch (err) {
        res.status(400).json({
            error: 'logout error'
        })
    }
}

// exports
module.exports = {
    login,
    signup,
    logout,
}