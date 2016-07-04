
var bcrypt = require('bcryptjs');
var config = require('./config');

var hashPassword = function(password, id) {
	var salt = bcrypt.genSaltSync(config.saltRounds);
	var hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
	hashPassword: hashPassword
}