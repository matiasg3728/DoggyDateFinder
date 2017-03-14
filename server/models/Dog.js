var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
  ownerId: String,
  name:String,
  //age: Number,
  //breed: String,
 // picture: String,
  playfulnessLevel: Number,
 // favoriteToys: String,
  //likes: String,
 // dislikes: String,
  //aboutMe: String,
  zipcode: Number,
  //playdateDogs: Array,
  //comments: Array,
}, {strict: false});

var dogModel = mongoose.model('Dog', DogSchema);

module.exports = dogModel;
