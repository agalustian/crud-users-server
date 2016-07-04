
var users = require('./users');

var userStorage = users.userStorage;

function createUser(req, res) {
  userStorage.addUser(req.body);
  res.status(200);
  res.send('User succesfull created');
};

function getUserData(req, res) {
  if ( !userStorage.getUser(req.params.id) ) {
    res.status(404);
    return res.send('User is not found');
  }; 

  res.status(200);
  res.send(JSON.stringify(userStorage.getUser(req.params.id)));
}

function updateUser(req, res) {
  if ( !userStorage.getUser(req.params.id)) {
    res.status(404);
    return res.send('User is not found');
  }; 

  var targetUser = userStorage.getUser(req.params.id);

  Object.keys(req.body).forEach(function(item) {
    if ( !targetUser[item] || item === 'id') {
      return console.error('Can\'t set this property: ' + item);
    };
    userStorage.editUser(targetUser, item, req.body);
  });

  res.status(200);
  res.send('User update is succesfull');
}

function deleteUser(req, res) {
  if (  !userStorage.getUser(req.params.id)) {
    res.status(404);
    return res.send('User is not found');
  }; 

  userStorage.delUser(req.params.id);

  res.status(200);
  res.send('User is deteled');
}

module.exports = {
  createUser: createUser,
  getUserData: getUserData,
  updateUser: updateUser,
  deleteUser: deleteUser
}