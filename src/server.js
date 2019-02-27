const http = require('http')

const app = require('./config/app')()

require('./config/mongodb')().then(m => console.log('db connected'))
  .catch(err => console.log(err))

const port = process.env.PORT || 5000
http.createServer(app).listen(port, () => console.log('http listening at port ' + port))
