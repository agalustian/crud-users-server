
var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users');
var config = require('./config');
var controller = require('./controller');

var port = config.port;
//var users = users.users;
var userStorage = users.userStorage;
//var hashPassword = bcryptPassword.hashPassword;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function() {
	console.log ('Server is running on port '+ port);
});

//POST
app.post( "/user", function(req, res) {
	controller.createUser(req, res);
});

//GET
app.get( "/user/:id", function(req, res) {
	controller.getUserData(req, res);
});

//PUT
app.put( "/user/:id", function(req, res) {
	controller.updateUser(req, res);
});

//DELETE
app.delete( "/user/:id", function(req, res) {
	controller.deleteUser(req, res);
});
