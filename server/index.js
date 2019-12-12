const express = require('express')

const app = express()

//设置密钥
app.set('secret', 'a6f1d3v51ev81s6v')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})