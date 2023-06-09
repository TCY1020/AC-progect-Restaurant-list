// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant.js')


// 新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantCreate = req.body
  Restaurant.create({ ...restaurantCreate, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 編輯餐廳
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const restaurantEdit = req.body
  Restaurant.findOneAndUpdate({ userId, _id }, restaurantEdit)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOneAndRemove({ userId, _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 餐廳細節
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({userId, _id})
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

module.exports = router
