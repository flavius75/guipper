const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Sequelize} = require('sequelize');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

require('dotenv/config');

  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);




module.exports=app;