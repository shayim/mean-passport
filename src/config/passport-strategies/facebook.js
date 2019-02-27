const facebook = require('passport-facebook')
const authstoreService = require('./authstore.service')

module.exports = function () {
  const strategy = new facebook.Strategy({
    clientID: 'clientID',
    clientSecret: 'clientSecret',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }, async function (at, rt, pf, done) {
    const account = {
      provider: 'facebook',
      providerId: pf.id,
      providerData: {
        at,
        rt
      }
    }

    const user = {
      name: pf.displayName || pf.username
    }

    await authstoreService(account, user, done)
  })

  return strategy
}
