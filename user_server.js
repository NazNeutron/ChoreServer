var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

var users = require('./routes/users.js')(app);



var server = app.listen(7000, function() {
    console.log('Server running at http:127.0.0.1:3000/');
});