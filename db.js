
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongoose.uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo connected');
});

var user = new mongoose.Schema({
	login: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	firstName: {type: String, required: true},
	secondName: {type: String, required: true},
	lastName: {type: String, required: true}
});

var UserModel = mongoose.model('UserModel', user);

module.exports = {
	UserModel: UserModel
}
