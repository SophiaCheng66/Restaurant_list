const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: Number,
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: String,
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: String,
  phone: Number,
  google_map: Map,
  rating: {
    type: Number,
    required: true
  },
  description: String,

})

module.exports = mongoose.model('restaurantItem', restaurantSchema)