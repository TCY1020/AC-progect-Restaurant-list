const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index',{
    restaurants: restaurantList.results
  })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantDetail = restaurantList.results.find( item => item.id.toString() === req.params.restaurant_id)
  
  res.render('show', {
    restaurant: restaurantDetail
  })
})
app.get('/search', (req, res) => {
  
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(item => {
    const restaurantsName = item.name.toLowerCase().includes(keyword.toLowerCase().trim())
    const restaurantsCategory = item.category.toLowerCase().includes(keyword.toLowerCase().trim())
    return restaurantsName || restaurantsCategory
  })
  if (restaurants.length !== 0) {
    res.render('index', {
          restaurants: restaurants,
          keyword: keyword
    })
  }else{
    res.render('error', {
      keyword: keyword
    })
  }
  
})
app.listen(port, () => {
  console.log(`Restaurant-list is running on http://localhost:${port}`)
})
