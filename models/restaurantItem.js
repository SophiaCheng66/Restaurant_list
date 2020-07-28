const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({

  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: { type: String },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: { type: String },
  phone: { type: String },
  google_map: { type: String },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('restaurantItem', restaurantSchema)