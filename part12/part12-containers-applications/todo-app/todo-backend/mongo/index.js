const mongoose = require('mongoose')
const Todo = require('./models/Todo')

require('dotenv').config()
const { MONGO_URL, MONGO_PASS, MONGO_USER } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState)

    mongoose.connect(MONGO_URL, {
      poolSize: 10,
      authSource: "admin",
      user: MONGO_USER,
      pass: MONGO_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false 
  });

console.log(mongoose.coonection)

module.exports = {
  Todo
}
