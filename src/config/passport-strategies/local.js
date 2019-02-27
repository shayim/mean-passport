const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Account = require('../../models/account.model')

module.exports = function () {
  const localStrategy = new LocalStrategy({
    usernameField: 'email'
  }, async function (email, password, done) {
    try {
      let account = await Account.findOne({
        email: email
      })
      if (!account) return done(null, false)
      if (!await bcrypt.compare(password, account.password)) return done(null, false)
      await Account.findByIdAndUpdate(account.id, {
        $currentDate: {
          lastVisit: {
            $type: 'timestamp'
          }
        }
      })
      return done(null, account)
    } catch (error) {
      return done(error)
    }
  })

  return localStrategy
}
