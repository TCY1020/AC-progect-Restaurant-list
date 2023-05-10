const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/Restaurant.js')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

// mongoDB連線
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () =>{
  console.log('mongodb error')
})
db.once('open', () =>{
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', {restaurants}))
  .catch(error => console.error(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show',{restaurant}))
    .catch(error => console.error(error))
})

app.get('/restaurant/new',(req, res) =>{
  res.render('new')
})
app.post('/restaurants',(req, res) =>{
  const restaurantCreate = req.body
  Restaurant.create(restaurantCreate)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(item => 
         item.name.toLowerCase().includes(keyword) ||
         item.name_en.toLowerCase().includes(keyword) ||
         item.category.toLowerCase().includes(keyword)
      )
      if (filteredRestaurants.length !== 0){
        res.render('index', {
          restaurants: filteredRestaurants,
          keyword: req.query.keyword
        })
      }else{
        res.render('error', {
          keyword: req.query.keyword
        })
      }
    })
})



app.listen(port, () => {
  console.log(`Restaurant-list is running on http://localhost:${port}`)
})
