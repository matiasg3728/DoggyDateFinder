var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
