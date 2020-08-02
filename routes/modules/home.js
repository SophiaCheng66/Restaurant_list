const express = require('express')
const router = express.Router()
const restaurantItem = require('../../models/restaurantItem.js')

router.get('/', (req, res) => {
  restaurantItem.find()
    .lean()
    .then(item => res.render('index', { restaurantDbData: item }))
    .catch(error => console.log(error))
})

module.exports = router

