const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 const passport = require('passport');
const users = require('./routes/userRoutes');

mongoose.connect('mongodb://localhost:27017/jwt-sample-db', { useNewUrlParser: true}).then(() => {
     console.log('Database is connected'), 
    err => {console.log('cannot connect to Database');}
 })

const app = express();
app.use(passport.initialize());
require('./passport')(passport);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api/users', users);

app.get('/', function(req, res){
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
}) 