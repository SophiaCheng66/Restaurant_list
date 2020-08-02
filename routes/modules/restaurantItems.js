const express = require('express')
const router = express.Router()
const restaurantItem = require('../../models/restaurantItem.js')



router.put('/:restaurant_id', (req, res) => {
  // console.log(req.params.restaurant_id)
  const id = req.params.restaurant_id
  const item = req.body.restaurantName
  const item1 = req.body.restaurantCategory
  const item2 = req.body.restaurantLocation
  const item3 = req.body.restaurantPhone
  const item4 = req.body.restaurantDescription
  return restaurantItem.findById(id)
    .then(restaurantId => {
      restaurantId.name = item
      restaurantId.category = item1
      restaurantId.location = item2
      restaurantId.phone = item3
      restaurantId.description = item4
      return restaurantId.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))


})

router.post("/", (req, res) => {
  const item = req.body.restaurantName
  const item1 = req.body.restaurantUrl
  // const restaurantSchema = new restaurantItem({ name: item, image: item1 })
  // restaurantSchema.save()
  restaurantItem.create({ name: item, image: item1 })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router

