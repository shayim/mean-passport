const mongoose = require('mongoose')

function emailValidate (emailAddress) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress)
}

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: function () {
      return !this.providerId
    },
    trim: true,
    minlength: 3,
    validate: emailValidate,
    index: true
  },
  password: {
    type: String,
    required: function () {
      return !this.providerId
    }
  },
  provider: {
    type: String,
    required: true
  },
  providerId: String,
  providerData: {},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastVisit: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Account', accountSchema)
