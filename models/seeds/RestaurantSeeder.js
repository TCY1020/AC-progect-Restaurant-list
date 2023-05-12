const Restaurant = require('../Restaurant.js')
const restaurantList = require('../../restaurants.json').results
const db = require('../../config/mongoose')

db.once('open', ()=>{
  Restaurant.create(restaurantList)
  console.log('done')
})


