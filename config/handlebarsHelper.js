const Handlebars = require('handlebars')
// choose: helper名稱，a,b為可傳入變數
Handlebars.registerHelper('choose', (a, b, option) => {
  if(a === b){
    return option.fn(this)// 條件成立時出現，handlebars內文字，
  }
  return option.inverse(this)// 條件不成立時出現，handlebars內文字
  
})