var express = require('express');
var router = express.Router();
var Dog = require('../models/Dog');



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
  			console.log('meow');
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