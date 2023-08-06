const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.REACT_APP_URL

console.log("URL", url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
  
const Person = mongoose.model('Person', personSchema)
  
mongoose
    .connect(url)
    .then(() => {
        console.log('connected')
    })
    .catch((err) => console.log(err))
