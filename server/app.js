require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var hbs = require('hbs');
var session = require('express-session');
var dotenv = require('dotenv').config();


require('./db/db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

app.use(session({
	secret: " this is the secret salt",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}));

app.get('/', function(request, response) {
	response.redirect('/user/login');
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var DogController = require('./controllers/DogController');
var UserController = require('./controllers/UserController');

app.use('/dogs', DogController);
app.use('/user', UserController);

server.listen(process.env.PORT || 5000);
