const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: true
  },
  street: String,
  city: String,
  state: String,
  postCode: String,
  country: String
})

module.exports.addressSchema = addressSchema
module.exports.Address = mongoose.model('Address', addressSchema)
