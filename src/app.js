const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../config/database');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
});

module.exports = app;
