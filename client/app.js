const express = require('express')
const app = express()
const server = require('http').Server(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))

//client side
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/user/:username', (req, res) => {
    res.render('profile', {user:req.params.username})
})


server.listen(3000)

console.log(`App Listening on Port 3000`)