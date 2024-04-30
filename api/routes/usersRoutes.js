const { Router } = require('express')


// controllers
// users controllers
const {
    login,
    signup,
    logout,
} = require('../controllers/usersControllers')

// router
const router = Router()

// login
router.post('/login', login)

// sign up
router.post('/signup', signup)

// logout
router.get('/logout', logout)

// exports
module.exports = router