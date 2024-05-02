require('dotenv').config()
const express = require('express')

// db
const dbConnection = require('./db/dbConnection')

// app
const app = express()

// port
const PORT = process.env.PORT || 5000

// settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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