const express = require('express')
const router = express.Router()
const restaurantItem = require('../../models/restaurantItem.js')

router.get('/', (req, res) => {
  // console.log(req.query.keyword.toLowerCase())

  const userSearch = req.query.keyword
  // const searchContent = restaurantList.results.filter(item => item.name.toLowerCase().includes(userSearch.toLowerCase()) || item.category.toLowerCase().includes(userSearch.toLowerCase())
  // )
  // if (userSearch !== '') {
  //   res.render('index', { restaurantContent: searchContent, userKeyword: userSearch })
  // } else {
  //   res.render('null')

  // }

  if (userSearch !== '') {
    restaurantItem.find({
      name: { $regex: userSearch, $options: "i" },
    })
      .lean()
      .then(restaurants => res.render('search', { searchDbData: restaurants }))
      .catch(error => console.log(error))
  } else {
    res.render('null')
  }
})


module.exports = router
