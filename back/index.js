const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shadowsRoutes = require('./routes/shadows');

const { PORT = 3002, MONGO_URL = 'mongodb://localhost:27017/Tammy' } = process.env;

const app = express();

app.use(cors()); 
app.use(shadowsRoutes);

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true
    })
    app.listen(PORT, () => {
      console.log('Server has been started ' + MONGO_URL)
    })
  } catch(e) {
    console.log(e);
  }
}

start();