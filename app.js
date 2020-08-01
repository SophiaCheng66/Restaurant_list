const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const db = mongoose.connection
const restaurantItem = require('./models/restaurantItem.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


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

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  restaurantItem.find()
    .lean()
    .then(item => res.render('index', { restaurantDbData: item }))
    .catch(error => console.log(error))
})



app.get('/restaurant/new', (req, res) => {
  res.render('new')
})


app.get('/search', (req, res) => {
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



app.delete('/restaurant/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  // console.log(req.params.restaurant_id)
  return restaurantItem.findById(id)
    .then(restaurantId => restaurantId.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





app.put('/restaurantItems/:restaurant_id', (req, res) => {
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

app.post("/restaurantItems", (req, res) => {
  const item = req.body.restaurantName
  const item1 = req.body.restaurantUrl
  // const restaurantSchema = new restaurantItem({ name: item, image: item1 })
  // restaurantSchema.save()
  restaurantItem.create({ name: item, image: item1 })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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