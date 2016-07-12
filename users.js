
var bcryptPassword = require('./bcryptPassword');
var UserModel = require('./libs/db').UserModel;

var hashPassword = bcryptPassword.hashPassword;

var formatUser = function(user){
  return {
    id: user._id,
    login: user.login,
    firstName: user.firstName,
    secondName: user.secondName,
    lastName: user.lastName
  };
};

var userStorage = {
  addUser:  function(newUserData, callback) {
    newUserData.password = hashPassword(newUserData.password);
    var newUser = new UserModel(newUserData);
     newUser.save(function(err, user){
      if (err) {
        return callback(err.message);
      };
      callback(null, user);
    });
    
  },
  editUser: function(userId, changingValues, callback) {
    UserModel.findOne({'_id': userId}, function(err, user){
      if(err || user === null) {
        return callback('not found');
      };

      user.login = changingValues.login || user.login;
      user.password = hashPassword(changingValues.password) || user.password;
      user.firstName = changingValues.firstName || user.firstName;
      user.secondName = changingValues.secondName || user.secondName;
      user.lastName = changingValues.lastName || user.lastName;

      user.save(function(err, user) {
        if (err) {
          return callback(err.message);
        };
        callback(null, user);
      })
    })
  },
  delUser:  function(userId, callback) {
    UserModel.findById({'_id': userId}, function(err, user){
      console.log(err, user);
      if (err || user === null){
        return callback('not found');
      };
      user.remove(function(err, data) {
        if (err) {
          return callback(err);
        };
        callback(null, data);
      });
    }) 
  },
  findById:  function(id, callback) {
    UserModel.findOne({'_id': id}, function(err, user) {
      if (err || data === null) {
        return callback('not found');
      };
      callback(null, formatUser(user));
    }) 
  },
  findUsers: function(findBy, callback) {
    UserModel.find(findBy, function(err, data) {
      if (err || data === null) {
        return callback('not found');
      };
      var users = data.map(function(user) {
          return formatUser(user);
        })
      callback(null,users);
    });
  }
}

module.exports = {
  userStorage: userStorage,
}
