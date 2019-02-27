const path = require('path')
const express = require('express')
const session = require('express-session')
const ejs = require('ejs').renderFile
const morgan = require('morgan')
const flash = require('connect-flash')

module.exports = function () {
  const app = express()

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.urlencoded({
    extended: true
  }))

  app.use(express.json())

  app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secret'
  }))

  app.use(flash())
  const passport = require('./passport')
  app.use(passport.initialize())
  app.use(passport.session())

  const userCtrl = require('../controllers/user.controller')
  app.use(userCtrl)

  const accountCtrl = require('../controllers/account.controller')
  app.use(accountCtrl)

  app.use('/', function (req, res) {
    res.render('index', {
      title: 'Home',
      account: req.user,
      messages: req.flash('error')
    })
  })

  app.set('views', path.resolve(__dirname, '../views'))
  app.engine('html', ejs)
  app.set('view engine', 'html')
  app.use(express.static(path.resolve(__dirname, '../public')))

  return app
}
