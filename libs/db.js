
var mongoose = require('mongoose');
var config = require('../config');
var mongooseSchemas = require('./mongooseSchemas');

mongoose.connect(config.mongoose.uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo connected');
});

var UserModel = mongoose.model('UserModel', mongooseSchemas.user);
var CameraModel = mongoose.model('CameraModel', mongooseSchemas.camera);

module.exports = {
	UserModel: UserModel,
	CameraModel: CameraModel
}
