
var bcrypt = require('bcryptjs');
var users = require('./users');


var hashPassword = function(password, id) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			users[id].password = hash;
		});
	});
};


module.exports = {
	hashPassword: hashPassword
}