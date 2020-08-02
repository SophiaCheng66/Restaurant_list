// const mongoose = require('mongoose')
const restaurantItem = require('../restaurantItem.js')
const restaurantSeed = require('../../restaurant.json').results
const db = require('../../config/mongoose.js')

// mongoose.connect('mongodb://localhost/Restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection

// mongoose.connect('mongodb://localhost/Restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

// db.on('error', () => {
//   console.log('mongodb error!')
// })


db.once('open', () => {
  // console.log('mongodb connected!')
  restaurantSeed.forEach(item => {
    restaurantItem.create( //{
      //   name: `${item.name}`,
      //   name_en: `${item.name_en}`,
      //   category: `${item.category}`,
      //   image: `${item.image}`,
      //   location: `${item.location}`,
      //   phone: `${item.phone}`,
      //   google_map: `${item.google_map}`,
      //   rating: `${item.rating}`,
      //   description: `${item.description}`,
      // }
      item)
  })
  console.log('done')
})


