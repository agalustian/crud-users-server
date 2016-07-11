
var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users');
var config = require('./config');
var controller = require('./controller');

var port = config.port;
var userStorage = users.userStorage;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/user", controller.createUser);
app.get("/user/:id", controller.findUserById);
app.get("/users", controller.findUsersData);
app.put("/user/:id", controller.updateUser);
app.delete("/user/:id", controller.removeUser);

app.listen(port, function() {
	console.log ('Server is running on port '+ port);
});
