
var port = 4444;
var saltRounds = 10;
var mongoose = {
	uri: "mongodb://localhost/test1"
}


module.exports = {
	port: port,
  saltRounds:saltRounds,
  mongoose: mongoose
};