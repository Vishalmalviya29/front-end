const mongoose = require('mongoose')
const uri = "mongodb://localhost:27017/front_and_backend_practice"

const connect_to_mongo = ()=> {
    mongoose.connect(uri)
    console.log('connected to db')
}

module.exports = connect_to_mongo;