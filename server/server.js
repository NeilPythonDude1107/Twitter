const express = require('express')
const cors = require('cors')
const app = express()
const environment = require('dotenv')
const connectDB = require('./config/db')

environment.config({
    path: './config/config.env'
})


//connect to MongoDB
connectDB()
//cors
app.use(cors())

//parser
app.use(express.json())

//models
require('./models/tweet')
require('./models/user')

//routes
app.use('/api/', require('./routes/tweets'))
app.use('/api/', require('./routes/users'))




app.listen(process.env.PORT, () => {
    console.log(`App Listening on http://localhost:${process.env.PORT}`)
})