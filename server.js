var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

var users = [
	{id:0, firstName: 'Ivan', secondName: 'Ivanov', lastName: "Ivanovich"},
	{id:1, firstName: 'Petr', secondName: 'Petrov', lastName: "Petrovich"},
	{id:2, firstName: 'Test', secondName: 'Testov', lastName: "Testovich"}
];

app.listen(4444, function() {
	console.log ('Server is running on port 4444....');
});

app.post( "/addUser", function(req, res) {
	var newUserId = users.length;

	users[newUserId] = {
		id: newUserId, 
		firstName: req.body.firstName,
		secondName: req.body.secondName,
		lastName: req.body.lastName
	};

	res.status(200);
	res.send('ok');
});

app.get( "/userId/:id", function(req, res) {
	if (typeof(users[req.params.id]) === 'undefined') {
		res.status(404);
		res.send('User is not found');
	} else {
		res.status(200);
		res.send(JSON.stringify(users[req.params.id]));
	};
});

app.put( "/editUser", function(req, res) {
	if (typeof(users[req.body.id]) === 'undefined') {
		res.status(404);
		res.send('User is not found');
	} else {
		var newUserParameters = req.body;
		for (var i in newUserParameters) {
			users[newUserParameters.id][i] = newUserParameters[i];
		};
		res.status(200);
		res.send('User update is succesfull');
	};
});


app.delete( "/deleteUser", function(req, res) {
	if (typeof(users[req.body.id]) === 'undefined') {
		res.status(404);
		res.send('User is not found');
	} else {
		users.splice([req.body.id], 1);
		res.status(200);
		res.send('User is deteled');
	};
});
