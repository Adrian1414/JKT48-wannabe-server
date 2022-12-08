const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded ({ extended:  true }))
app.use(express.json())
// app.use(express.static(__dirname + '/views'));
app.use('/',  router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
