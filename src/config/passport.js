const passport = require('passport')
const local = require('./passport-strategies/local')
const facebook = require('./passport-strategies/facebook')
const twitter = require('./passport-strategies/twitter')
const weixin = require('./passport-strategies/weixin')
const Account = require('../models/account.model')

passport.use(local())
passport.use(facebook())
passport.use(twitter())
passport.use(weixin())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const account = await Account.findById(id).select('-password').populate('user')
    done(null, account)
  } catch (error) {
    console.log(error)
    done(error)
  }
})

module.exports = passport
