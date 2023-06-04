const express = require('express')
const router = express.Router()

router.get('/login', (req, res) =>{
  res.render('login')
})

router.get('/register', (req, res) =>{
  res.render('register')
})
//TODO: passport bcrypt session 寫入 雜湊 註冊
router.post('/register', (req, res) => {

})

module.exports = router