const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/api', require('./routes/index'))

require('./db')

app.listen(4000, () => {
  console.log('server running')
})