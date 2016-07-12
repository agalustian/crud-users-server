

var bcrypt = require('bcryptjs');
var config = require('./config');

var hashPassword = function(password) {
	if(!password) {
		return undefined;
	}
	var salt = bcrypt.genSaltSync(config.saltRounds);
	var hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
	hashPassword: hashPassword
}

