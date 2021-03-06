const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const restaurants = require('./modules/restaurants.js')
const search = require('./modules/search.js')
const restaurantItems = require('./modules/restaurantItems.js')
const restaurantList = require('./modules/restaurantList.js')
const sort = require('./modules/sort.js')


router.use('/', home)
router.use('/restaurant', restaurants)
router.use('/search', search)
router.use('/restaurantItems', restaurantItems)
router.use('/restaurantList', restaurantList)
router.use('/sort', sort)


module.exports = router