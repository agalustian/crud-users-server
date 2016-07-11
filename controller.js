
var users = require('./users');
var util = require('util');

var userStorage = users.userStorage;

function createUser(req, res) {
  userStorage.addUser(req.body, function(err, data) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('user created');
  });
};

function findUserById(req, res) {
  userStorage.findById(req.params.id, function(err, data) {
    if (err) {
      console.error('can\'t find');
      return res.status(404).send('not found');
    }    
    res.status(200).send(JSON.stringify(data));
  });
}

function findUsersData(req, res) {
  userStorage.findUsers(req.query, function(err, data){
    if (err) {
      console.error('can\'t find');
      return res.status(404).send('not found');
    } 
    res.status(200).send(util.format("%j", data));   
  })
}

function updateUser(req, res) {
  if (req.body.id) {
    return console.error('Can\'t change this property: ' + req.body.id);
  };
  userStorage.editUser(req.params.id, req.body, function(err, data) {
    if(err) {
      return res.status(404).send('not found');
    }
    res.status(200).send('update is sucessfull');
  });
}

function removeUser(req, res) {
  userStorage.delUser(req.params.id, function(err, data) {
    if (err) {
      return res.status(404).send('cant delete'); 
    }
    res.status(200).send(data);
  });

  
}

module.exports = {
  createUser: createUser,
  findUserById: findUserById,
  updateUser: updateUser,
  removeUser: removeUser,
  findUsersData:findUsersData
}