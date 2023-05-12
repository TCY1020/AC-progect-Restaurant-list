const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/Restaurant.js')


const app = express()
const port = 3000

require('./config/mongoose.js')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', {restaurants}))
  .catch(error => console.error(error))
})

// 餐廳細節
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show',{restaurant}))
    .catch(error => console.error(error))
})

// 新增餐廳
app.get('/restaurant/new',(req, res) =>{
  res.render('new')
})
app.post('/restaurants',(req, res) =>{
  const restaurantCreate = req.body
  Restaurant.create(restaurantCreate)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 編輯餐廳
app.get('/restaurants/:id/edit', (req, res) =>{
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})
app.post('/restaurants/:id/edit', (req, res) =>{
  const id = req.params.id
  const restaurantEdit = req.body
  Restaurant.findByIdAndUpdate(id, restaurantEdit)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪除餐廳
 app.post('/restaurants/:id/delete', (req, res) =>{
  const id =req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
}) 
// 搜尋餐廳
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
