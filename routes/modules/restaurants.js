const express = require('express')
const router = express.Router()
const restaurantItem = require('../../models/restaurantItem.js')

router.get('/new', (req, res) => {
  res.render('new')
})



router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  restaurantItem.findById(id)
    .lean()
    .then(restaurantId => res.render('show', { showContent: restaurantId }))
    .catch(error => console.log(error))
})


router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  restaurantItem.findById(id)
    .lean()
    .then(restaurantId => res.render('edit', { restaurantId }))
    .catch(error => console.log(error))
})



router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  // console.log(req.params.restaurant_id)
  return restaurantItem.findById(id)
    .then(restaurantId => restaurantId.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router





























