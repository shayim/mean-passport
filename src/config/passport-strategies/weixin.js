const WeixinStrategy = require('passport-weixin')
const authstoreService = require('./authstore.service')

module.exports = function () {
  const strategy = new WeixinStrategy({
    clientID: 'clientID',
    clientSecret: 'clientSecret',
    callbackURL: 'http://localhost:3000/auth/weixin/callback',
    requireState: false
  }, async function (at, rt, pf, done) {
    console.log(pf)

    const account = {
      provider: 'weixin',
      providerId: pf.id,
      providerData: {
        at,
        rt
      }
    }
    const user = {
      name: pf.displayName,
      pictures: [{
        source: 'weixin',
        url: pf.profileUrl
      }],
      gender: pf._json.sex === 1 ? 'male' : 'female',
      locale: pf._json.language.replace('_', '-'),
      addresses: [{
        kind: 'home',
        city: pf._json.city,
        state: pf._json.province,
        country: pf._json.country
      }]
    }

    await authstoreService(account, user, done)
  })

  return strategy
}
