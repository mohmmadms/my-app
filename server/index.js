
require("dotenv").config();
const express = require('express')
const cors = require("cors");
const connectToMongo = require("./db/connection");



const app = express()
const port = process.env.PORT




app.use(cors());
app.use(express.urlencoded({ extended: false }));//true

//build-in middleware 
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectToMongo();
})