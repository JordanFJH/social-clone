const express = require('express')
const cors = require('cors')
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const { authorize } = require("./middleware/authMiddleware")

require('dotenv').config()

const mongoConfig = require("./config")

mongoConfig()

// const userRoutes = require('./routes/userRoutes')

//MIDDLEWARE
// const { authorize } = require("./middleware/authMiddleware")

const app = express()

const PORT = 8080

app.use(cors())
app.use(express.json())

//Login/Register Links
app.use('/auth', authRoutes)

// Profile Link
app.use('/api/users', authorize, userRoutes)

app.get("/", (req, res) => {
    res.send("Hi")
})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})

