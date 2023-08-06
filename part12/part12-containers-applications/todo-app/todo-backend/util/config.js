require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL || undefined
const MONGO_USER = process.env.MONGO_USER || undefined
const MONGO_PASS = process.env.MONGO_PASS || undefined
const REDIS_URL = process.env.REDIS_URL || undefined

module.exports = {
  MONGO_URL,//: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL,//: '//localhost:6378'
  MONGO_USER,
  MONGO_PASS
}