const mongoose = require('mongoose')
const addressSchema = require('./shared/address.model').addressSchema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    index: true
  },
  pictures: [{
    source: String,
    url: String
  }],
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  locale: String,
  birthDate: Date,
  addresses: [addressSchema],
  accounts: [{
    type: 'ObjectId',
    ref: 'Account'
  }]
})

module.exports = mongoose.model('User', userSchema)
