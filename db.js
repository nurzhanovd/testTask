const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/testTask')

const db = mongoose.connection

db.on('error',  () => console.error('Database connection failed'))
db.once('open', () => console.log('Connection with database succeeded'))

exports.db = db