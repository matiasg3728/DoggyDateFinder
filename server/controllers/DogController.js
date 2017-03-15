var express = require('express');
var router = express.Router();
var Dog = require('../models/Dog');


router.get('/home', function(request,response){ 

	var dogArray = [];
	var userID = request.session.userId;
	Dog.find({ownerId: userID}, function(err, docs){
		console.log('inside find')
		dogArray = docs;
		console.log(dogArray + 'this is the dogArray value')
		response.render('userhome',{dogies:dogArray})
	
	});
})

router.get('/adddog', function(request, response){
	response.render('adddog');
});

router.post('/adddog', function(request, response){
	//copy and paste any form post
	var userID = request.session.userId;
	console.log("userID: "+userID)
	var dog = new Dog({
		ownerId: userID,
		name: request.body.name, 
		playfulnessLevel: request.body.playfulnessLevel, 
		zipcode: request.body.zipcode
	})
	dog.save(function (err) {
		if (err) {
			console.log(err);
		} else {
  			console.log('dog inputted into db');
		}
	});

	response.render('userhome');	

});

router.get('/:id', function(request, response){
	var id = req.params.id;
	Dog.findById(id, function(err, dog){
		console.log(dog);
		response.render('dogprofile');
	});
});

module.exports = router;