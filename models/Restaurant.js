const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    google_map: {
        type: String
    },
    rating: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        createIndexes: true,
        required: true,
    }
})

//透過 module.exports 輸出
//mongoose.model會在 mongo 中建立名為 Restaurants 的 collection用restaurantSchema的json格式
module.exports = mongoose.model('Restaurants', restaurantSchema)