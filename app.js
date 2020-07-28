const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const db = mongoose.connection
const restaurantItem = require('./models/restaurantItem.js')
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  restaurantItem.find()
    .lean()
    .then(item => res.render('index', { restaurantDbData: item }))
    .catch(error => console.log(error))
})




app.get('/restaurant/new', (req, res) => {
  res.render('new')
})


app.get('/restaurant/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  restaurantItem.findById(id)
    .lean()
    .then(restaurantId => res.render('show', { showContent: restaurantId }))
    .catch(error => console.log(error))
})

app.get('/restaurant/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  restaurantItem.findById(id)
    .lean()
    .then(restaurantId => res.render('edit', { restaurantId }))
    .catch(error => console.log(error))
})


app.post("/restaurantItems", (req, res) => {
  const item = req.body.restaurantName
  const item1 = req.body.restaurantUrl
  // const restaurantSchema = new restaurantItem({ name: item, image: item1 })
  // restaurantSchema.save()
  restaurantItem.create({ name: item, image: item1 })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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
  restaurantItem.find()
    .lean()
    .then(item => res.render('index', { restaurantDbData: item }))
    .catch(error => console.log(error))
})




app.listen(port, () => {
  console.log(`this app running on ${port}`)
})