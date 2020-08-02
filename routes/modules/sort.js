const express = require('express')
const router = express.Router()
const restaurantItem = require('../../models/restaurantItem.js')

router.get('/:id', (req, res) => {
  const id = req.params.id
  if (id === 'A') {
    restaurantItem.find()
      .lean()
      .sort({ name_en: 'asc' })

      .then(todos => res.render('sort', { todos }))
      .catch(error => console.log(error))
  } else if (id === 'Z') {
    restaurantItem.find()
      .lean()
      .sort({ name_en: 'desc' })

      .then(todos => res.render('sort', { todos }))
      .catch(error => console.log(error))
  } else if (id === 'category') {
    restaurantItem.find()
      .lean()
      .sort({ category: 'asc' })

      .then(todos => res.render('sort', { todos }))
      .catch(error => console.log(error))

  } else if (id === 'location') {
    restaurantItem.find()
      .lean()
      .sort({ location: 'asc' })

      .then(todos => res.render('sort', { todos }))
      .catch(error => console.log(error))
  }
})


module.exports = router