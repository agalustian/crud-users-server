
var bcryptPassword = require('./bcryptPassword');
var UserModel = require('./db').UserModel;

var hashPassword = bcryptPassword.hashPassword;

var formatUser = function(user){
  return {
    id: user._id,
    login: user.login,
    firstName: user.firstName,
    secondName: user.secondName,
    lastName: user.lastName
  }
}

var userStorage = {
  addUser:  function(newUserData, callback) {
    newUserData.password = hashPassword(newUserData.password);
    var newUser = new UserModel(newUserData);
     newUser.save(function(err, user){
      if (err) {
        return callback(err.message);
      }
      callback(null, user);
    });
    
  },
  editUser: function(userId, changingValues, callback) {
    UserModel.findById({'_id': userId}, function(err, user){
      if(err) {
        return callback(err);
      }

      user.login = changingValues.login;
      user.password = hashPassword(changingValues.password);
      user.firstName = changingValues.firstName;
      user.secondName = changingValues.secondName;
      user.lastName = changingValues.lastName;

      user.save(function(err, user) {
        if (err) {
          return callback(err.message);
        }
        callback(null, user);
      })
    })
  },
  delUser:  function(userId, callback) {
    return UserModel.findOne({'_id': userId}).remove(function(err, data) {
      if (err) {
        return callback(err);
      }
      callback(null, data)
    });
  },
  findById:  function(id, callback) {
    UserModel.findOne({'_id': id}, function(err, data) {
      if (err) {
        return callback(err);
      }
      callback(null, formatUser(data));
    }) 
  },
  findUsers: function(findBy, callback) {
    UserModel.find(findBy, function(err, data) {
      if (err) {
        return callback(err);
      }
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
