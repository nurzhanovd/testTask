const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
  location: {
    type: String
  },
  geodata: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  }
})

module.exports = mongoose.model('Location', LocationSchema)