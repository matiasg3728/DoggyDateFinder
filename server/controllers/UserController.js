var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');



router.get('/login', function(request, response, next) {
  response.render('login', {});
});

router.post('/login', function(request, response, next) {
  // console.log('in log in');
  // console.log(request.session);
  User.findOne({username: request.body.username}, function(err, user) {
    if(user) {
      bcrypt.compare(request.body.password, user.password, function(err, match) {
        if(match === true) {
          request.session.username = user.username;
          request.session.userId = user.id;
          request.session.isLoggedIn = true;
          console.log('inside nested if')
          response.redirect('/dogs/home');
        }
        else {
          response.render('login', {message: 'username or password was incorrect'})
        }
      })
    }
    else {
      response.render('login', {message: 'username or password was incorrect'});
    }
  })
});

router.get('/signup', function(request, response, next) {
  // console.log(request.session)
  response.render('signup', {})
});

router.post('/signup', function(request, response, next) {
  User.findOne({username: request.body.username}, function(err, user) {
    if(user === null) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(request.body.password, salt, function(err, hash) {
          var userDbEntry = {};
          userDbEntry.username = request.body.username;
          userDbEntry.password = hash;

          User.create(userDbEntry, function(err, user) {
            if(user) {
              request.session.username = user.username;
              request.session.userId = user.id;
              request.session.isLoggedIn = true;

              response.redirect('/dogs/adddog');
            }
            else {
              response.render('login', {message: 'username unavailable'});
            }
          })
        })
      })
    }
    else {
      response.render('signup', {message: 'username already taken'})
    }
  })
});

router.get('/home', function(request, response) {
  // if(request.session.isLoggedIn === true){
  //   console.log(' hey im still logged in')
  // }
  // else {
  //   console.log(request.session, ' this is req')
  // }
  // console.log(request.session)
  response.render('userhome')
});

router.get('/logout', function(request, response) {
  // console.log("logged out");
  // console.log(request.session);
  request.session.destroy(function(err) {
    response.redirect('/user/login');
  });
});

module.exports = router;
