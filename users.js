
var bcryptPassword = require('./bcryptPassword');

var hashPassword = bcryptPassword.hashPassword;

var users = [
	{id:0, login: 'test0', password: 0000, firstName: 'Ivan', secondName: "Ivanovich" , lastName:'Ivanov'},
	{id:1, login: 'test1', password: 1111, firstName: 'Petr', secondName: "Petrovich" , lastName:'Petrov'},
	{id:2, login: 'test2', password: 2222, firstName: 'Test', secondName: "Testovich" , lastName:'Testov'}
];

var userStorage = {
  addUser:  function(user) {
          var newUser = {
            id: users.length, 
            login: user.login,
            password: hashPassword( user.password, users.length ),
            firstName: user.firstName,
            secondName: user.secondName,
            lastName: user.lastName
        };
          users.push(newUser);
        },
  editUser: function(targetUser, item, changingValues) {
              if (item === 'password') {
                  targetUser[item] = hashPassword(changingValues.password, targetUser.id);
                  return true; 
              };
              targetUser[item] = changingValues[item];
            },
  delUser:  function(targetUser) {
              users.splice(targetUser, 1);
            },
  getUser:  function(targetUser) {
              return users[targetUser];
            }
}

module.exports = {
  userStorage: userStorage,
  users:users
}
