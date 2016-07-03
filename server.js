
var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users');
var config = require('./config');
var bcryptPassword = require('./bcryptPassword');

var port = config.port;
var hashPassword = bcryptPassword.hashPassword;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function() {
	console.log ('Server is running on port '+ port);
});

//POST
app.post( "/user", function createUser(req, res) {

	var newUser = {
		id: users.length, 
		login: req.body.login,
		password: hashPassword( req.body.password, users.length ),
		firstName: req.body.firstName,
		secondName: req.body.secondName,
		lastName: req.body.lastName
	};
	users.push(newUser);

	res.status(200);
	res.send('ok');
});

//GET
app.get( "/user/:id", function getUserValues(req, res) {

	if ( !users[req.params.id] ) {
		res.status(404);
		return res.send('User is not found');
	} 

	res.status(200);
	res.send(JSON.stringify(users[req.params.id]));
});

//PUT
app.put( "/user/:id", function updateUser(req, res) {

	if ( !users[req.params.id] ) {
		res.status(404);
		return res.send('User is not found');
	} 

	var targetUser = users[req.params.id];

	Object.keys(req.body).forEach(function(item) {
		if ( !targetUser[item] || item === 'id') {
			return console.error('Can\'t set this property: ' + item);
		} else if ( item === 'password' ) {
			hashPassword(req.body.password, req.params.id);
			return true;
	 	}
		targetUser[item] = req.body[item];
	});

	res.status(200);
	res.send('User update is succesfull');
});

//DELETE
app.delete( "/user/:id", function deleteUser(req, res) {

	if ( !users[req.params.id] ) {
		res.status(404);
		return res.send('User is not found');
	} 

	users.splice([req.params.id], 1);

	res.status(200);
	res.send('User is deteled');
});
