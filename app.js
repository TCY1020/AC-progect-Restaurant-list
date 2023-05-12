const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const handlebarsHelper = require('./config/handlebarsHelper.js')
const routers = require('./routes')
const app = express()
const port = 3000

require('./config/mongoose.js')

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebarsHelper }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routers)





app.listen(port, () => {
  console.log(`Restaurant-list is running on http://localhost:${port}`)
})
