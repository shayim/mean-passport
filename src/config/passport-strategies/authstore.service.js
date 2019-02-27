const Account = require('../../models/account.model')
const User = require('../../models/user.model')

module.exports = async function (acc, usr, done) {
  try {
    let account = await Account.findOneAndUpdate({
      provider: acc.provider,
      providerId: acc.providerId
    }, {
      $currentDate: {
        lastVisit: {
          $type: 'timestamp'
        }
      }
    }, {
      new: true
    })

    if (!account) {
      const user = await (new User(usr)).save()
      account = await (new Account({
        ...acc,
        user: user._id
      })).save()
    }
    return done(null, account)
  } catch (error) {
    return done(error)
  }
}
