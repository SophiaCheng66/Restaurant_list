const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const db = mongoose.connection
const restaurantItem = require('./models/restaurantItem.js')

mongoose.connect('mongodb://localhost/Restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  restaurantItem.find()
    .lean()
    .then(item => res.render('index', { restaurantDbData: item }))
    .catch(error => console.log(error))
})

app.get('/restaurant/:restaurant_id', (req, res) => {
  // console.log(req.params.restaurant_id)
  const restaurantShow = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  if (req.params.restaurant_id <= 8) {
    res.render('show', { showContent: restaurantShow })
  } else {
    res.render('null')
  }

})

app.get('/search', (req, res) => {
  // console.log(req.query.keyword)

  const userSearch = req.query.keyword
  const searchContent = restaurantList.results.filter(item => item.name.toLowerCase().includes(userSearch.toLowerCase()) || item.category.toLowerCase().includes(userSearch.toLowerCase())
  )
  if (userSearch !== '') {
    res.render('index', { restaurantContent: searchContent, userKeyword: userSearch })
  } else {
    res.render('null')

  }
})

app.get('/restaurantList', (req, res) => {
  res.render('index', { restaurantContent: restaurantList.results })
})



app.listen(port, () => {
  console.log(`this app running on ${port}`)
})