
//TODO:handlebars-helper筆記
const Handlebars = require('handlebars')
// choose: helper名稱，a,b為可傳入變數
Handlebars.registerHelper('choose', (a, b, option) => {
  if(a === b){
    return option.fn(this)// handlebars內文字，條件成立時出現
  }
    return option.inverse(this)// handlebars內文字，條件不成立時出現
  
})