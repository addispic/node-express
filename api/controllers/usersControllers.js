

// login
const login = (req, res) => {
    res.status(200).json({
        message: 'LOGIN'
    })
}

// signup
const signup = (req, res) => {
    res.status(200).json({
        message: 'SIGNUP'
    })
}

// logout
const logout = (req, res) => {
    res.status(200).json({
        message: 'LOGOUT'
    })
}

// exports
module.exports = {
    login,
    signup,
    logout,
}