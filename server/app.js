var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var hbs = require('hbs');
var session = require('express-session');


require('./db/db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

app.use(session({
	secret: " this is the secret salt",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var DogController = require('./controllers/DogController');
var UserController = require('./controllers/UserController');

app.use('/dogs', DogController);
app.use('/user', UserController);

server.listen(3000, function(){
	console.log("Listening on port 3000");
});
