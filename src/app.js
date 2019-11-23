const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('parcialfinal:database');

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
  })
  .then(() => {
    debug("success Connected to database")
  })
  .catch((err) => {
    debug(err);
    process.exit(1);
  });

const app = express();

// connection to db
mongoose.connect('mongodb://localhost/crud-mongo')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
