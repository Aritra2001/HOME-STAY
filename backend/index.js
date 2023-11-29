require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

//express app
const app = express()

//cors
app.use(cors({}))

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

//routes
app.use('/api/users', userRoutes)

//database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening to port
    app.listen(process.env.PORT, () => {
        console.log('Listening for requests on PORT', process.env.PORT)
    })
})
.catch((err) => {
    console.log('server encountered an error', err)
})