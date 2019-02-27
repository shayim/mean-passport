const twitter = require('passport-twitter')
const authstoreService = require('./authstore.service')

module.exports = function () {
  const strategy = new twitter.Strategy({
    consumerKey: 'key',
    consumerSecret: 'secret',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  }, async function (at, rt, pf, done) {
    const account = {
      provider: 'twitter',
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
