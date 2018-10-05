const mongoose = require('mongoose')
const Location = require('../models/Location')

const initData = async (req, res) => {
  try{
    const newLocation = [new Location({
      location: "Мега на Розыбакиева",
      geodata: {
        lat: 15,
        lng: 28
      }
    }),
    new Location({
      location: "МУИТ",
      geodata: {
        lat: 123,
        lng: 43.34
      }
    }),
    new Location({
      location: "Smart Point",
      geodata: {
        lat: 15,
        lng: 48
      }
    }),
    new Location({
      location: "Достык Плаза",
      geodata: {
        lat: 458,
        lng: 45
      }
    }),
    new Location({
      location: "Мега на Сейфулина",
      geodata: {
        lat: 47,
        lng: 34
      }
    }),
    ]
    

    await Location.insertMany(newLocation)

    res.send('loaded')
  }catch(e){
    res.status(400).send(e)
  }
}

const findData = async (req, res) => {
  try{
    const {location} = req.query
    // const data = await Location.find({
    //   "location" : { $regex: /`${location}`/i}
    // })
    const data = await Location.find({
      "location" : {
        $regex : new RegExp(location.toLowerCase().trim(), 'i')
      }
    })
    console.log(data)
    res.send(data)
  }catch(e){
    console.log(e)
    res.status(400).send(e)
  }

}

const endpoint = async (req,res) => {
  res.send('123')
}

module.exports = {
  endpoint,
  initData,
  findData
}