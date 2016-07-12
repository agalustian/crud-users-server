
var mongoose = require('mongoose');

var user = new mongoose.Schema({
	login: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	firstName: {type: String, required: true},
	secondName: {type: String, required: true},
	lastName: {type: String, required: true}
});

var camera = new mongoose.Schema({
	name: {type: String, unique: true, required: true},
	ip: {type: String, required: true},
	address: {type: String, required: true},
	longitude: {type: String, required: true},
	latitude:  {type: String, required: true}
})

module.exports = {
	user: user,
	camera: camera
}