require('dotenv').config()
const express = require('express')

// db
const dbHandler = require('./db/dbHandler')

// app
const app = express()
// port
const PORT = process.env.PORT || 5000

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(5000, async () => {
    await dbHandler()
    console.log('listening')
})

// routes
// users
app.use('/api/users',require('./routes/usersRoutes'))