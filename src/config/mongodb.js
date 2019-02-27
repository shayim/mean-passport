const mongoose = require('mongoose')
const uri = 'mongodb+srv://m001-student:a64646464@cluster0-rhga8.mongodb.net/blog-app'

module.exports = function () {
  return mongoose.connect(uri, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true
  })
}
