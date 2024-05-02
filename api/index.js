require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')

// db
const dbConnection = require('./db/dbConnection')

// app
const app = express()

// port
const PORT = process.env.PORT || 5000

// settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// listening
app.listen(PORT, async () => {
    await dbConnection()
    console.log('listening')
})

// routes
// users
app.use('/api/users', require('./routes/usersRoutes'))
// notes
app.use('/api/notes', require('./routes/notesRoutes'))