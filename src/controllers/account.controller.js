const bcrypt = require('bcrypt')
const router = require('express').Router()
const Account = require('../models/account.model')
const passport = require('passport')

function validate (password) {
  return /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)
}

router.get('/auth/weixin', passport.authenticate('weixin', {
  failureRedirect: '/account/login'
}))

router.get('/auth/weixin/callback', passport.authenticate('weixin', {
  failureRedirect: '/account/login',
  successRedirect: '/users'
}))

router.get('/auth/twitter', passport.authenticate('twitter', {
  failureRedirect: '/account/login'
}))

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/account/login',
  successRedirect: '/users'
}))

router.get('/auth/facebook', passport.authenticate('facebook', {
  failureRedirect: '/account/login'
}))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/account/login',
  successRedirect: '/users'
}))

router.get('/account/register', async (req, res) => {
  res.render('register', {
    title: 'register',
    account: req.user,
    messages: req.flash('error') || req.flash('info')
  })
})

router.get('/account/login', async (req, res) => {
  res.render('login', {
    title: 'Login',
    account: req.user,
    messages: req.flash('error') || req.flash('info')
  })
})

router.post('/account/register', async (req, res) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    req.flash('error', 'email/password not found')
    return res.redirect('/account/register')
  }
  if (!validate(password)) {
    req.flash('error', 'weak password')
    return res.redirect('/account/register')
  }

  try {
    const hash = await bcrypt.hash(password, 10)
    let account = new Account({
      email,
      password: hash,
      provider: 'local'
    })
    account = await account.save()
    console.log('account saved successfully', account)
    req.login(account, err => {
      if (err) {
        console.log('req#login', err)
        throw err
      }

      res.redirect('/')
    })
  } catch (error) {
    // TODO handle error
    console.log(error)
    throw error
  }
})

router.post('/account/login', passport.authenticate('local', {
  failureRedirect: '/account/login',
  failureFlash: true
}),
async (req, res) => {
  res.redirect('/users')
})

router.post('/account/logout', async (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
