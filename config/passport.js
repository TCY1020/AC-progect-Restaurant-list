// Passport登入策略

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true, }, (req, email, password, done) => {
    User.findOne({ email })
    .then(user => {
      if(!user){
        return done(null, false, req.flash('warning_msg', 'That email is not registered!'))
      }
      return bcrypt.compare(password, user.password).then( isMatch =>{
        if(!isMatch){
          return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
        }
        return done(null, user)
      })
    })
    .catch(err => done(err, false))
  }))
  
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['displayName', 'email']
  },
    (accessToken, refreshToken, profile, done) => {
      //console.log(profile)
      const { name, email} = profile._json
      User.findOne({email})
        .then(user =>{
          if(user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash,
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }
  ));

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    // 序列化，從data找到完整user物件，把user id存入session
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    // 根據session裡的user id從data查找完整user物件
    User.findById(id)
      .lean()
      .then(user => { done(null, user) })
      .catch(err => done(err, null))
  })
}