const express = require('express')
const productRouter = require('./routes/product')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(productRouter)



app.listen(process.env.PORT, console.log('server is up and running on PORT', process.env.PORT))