
require("dotenv").config();
const express = require('express')
const cors = require("cors");
const connectToMongo = require("./db/connection");
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrolRoutes = require('./routes/enrollRoutes')



const app = express()
const port = process.env.PORT




const allowedOrigins = ['http://localhost:3000', 'https://my-app-fe.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));//true

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