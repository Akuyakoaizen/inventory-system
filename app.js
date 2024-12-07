const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const inventoryRoutes = require('./routes/inventoryRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.use(express.static('public'));


app.use((req, res, next) => {
  console.log('Requested URL:', req.url);
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/inventory', inventoryRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Connection failed:', err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
