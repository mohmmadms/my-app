
require("dotenv").config();
const express = require('express')
const cors = require("cors");
const connectToMongo = require("./db/connection");
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrolRoutes = require('./routes/enrollRoutes')
const path = require('path');



const app = express()
const port = process.env.PORT




app.use(cors());
app.use(express.urlencoded({ extended: false }));//true
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//build-in middleware 
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', enrolRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectToMongo();
})