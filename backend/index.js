require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

//express app
const app = express()

//middleware
app.use(express.json())

//cors
const allowedOrigins = [
    "https://www.smartmaintenance.in/", "https://home-stay-frontend-git-main-aritra2001.vercel.app/", "https://home-stay-frontend-hs9lf1udw-aritra2001.vercel.app/"

];

app.use(cors({
    origin:function(origin,callback){
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
}))

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