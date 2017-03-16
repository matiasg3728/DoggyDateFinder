var express = require('express');
var router = express.Router();
var Dog = require('../models/Dog');



router.get('/home', function(request,response){
	var dogArray = [];
	var userID = request.session.userId;

	if(request.session.isLoggedIn === true){
		Dog.find({ownerId: userID}, function(err, docs){
			console.log('inside find')
			dogArray = docs;
			console.log(dogArray + 'this is the dogArray value')
			response.render('userhome',{dogies:dogArray})
		});
  }
  else {
    response.redirect('/user/login');
  }
})

router.get('/adddog', function(request, response){
	if(request.session.isLoggedIn === true){
		response.render('adddog');
	}
	else {
    response.redirect('/user/login');
  }
});

router.post('/adddog', function(request, response){
	var userID = request.session.userId;
	console.log("userID: "+userID)
	var dog = new Dog({
		ownerId: userID,
		name: request.body.name,
		age: request.body.age,
		breed: request.body.breed,
		picture: request.body.picture,
		playfulnessLevel: request.body.playfulnessLevel,
		favoriteToys: request.body.favoriteToys,
		likes: request.body.likes,
		dislikes: request.body.dislikes,
		aboutMe: request.body.aboutMe,
		zipcode: request.body.zipcode
	})
	dog.save(function (err) {
		if (err) {
			console.log(err);
		} else {
  			console.log('save is working');
		}
	});
	response.redirect('/dogs/home');
});

router.get('/:id', function(request, response){
	var id = req.params.id;
	Dog.findById(id, function(err, dog){
		console.log(dog);
		response.render('dogprofile', {doggie:dog});
	});
});

module.exports = router;
