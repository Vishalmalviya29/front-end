const express = require('express')
const connect_to_mongo = require('./db')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

port = 5000

connect_to_mongo()

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send('Hello world')
    console.log('application started')
})


app.use('/api/auth', require('./Routes/Auth.js'))


app.listen(port, ()=> {
    console.log(`application listening on port no - ${port}`)
})