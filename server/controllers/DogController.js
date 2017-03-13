var express = require('express');
var router = express.Router();
var Dog = require('../models/Dog');

router.get('/', function(request, response){
	Dog.find(function(err, dog){
		console.log(dog);
		response.render('dogprofile');
	});
});

module.exports = router;