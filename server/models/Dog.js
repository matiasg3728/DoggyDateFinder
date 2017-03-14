var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
  //ownerId: Number,
  name: {type: String, required: true},
  //age: Number,
  //breed: String,
 // picture: String,
  playfulnessLevel: {type: Number, required: true},
 // favoriteToys: String,
  //likes: String,
 // dislikes: String,
  //aboutMe: String,
  zipcode: {type: Number, required: true},
  //playdateDogs: Array,
  //comments: Array,
}, {strict: false});

var dogModel = mongoose.model('Dog', DogSchema);

module.exports = dogModel;
