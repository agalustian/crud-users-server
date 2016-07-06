
var bcryptPassword = require('./bcryptPassword');

var hashPassword = bcryptPassword.hashPassword;

var users = [
{"id":0,
"login":"test0",
"password":"$2a$10$9lp8iM3SBsj23RbiQSQkuOoEeyBRoMnG9IiZUoxjan.qsj7X8FepC",
"firstName":"Ivan",
"secondName":"Ivanovich",
"lastName":"Ivanov"},
{"id":1,
"login":"test1",
"password":"$2a$10$8tZI6D/R3.izg/nisw0GdescoJCNZGk3qkzpl9Rc1PMWmFnQVUvb2",
"firstName":"Petr",
"secondName":"Petrovich",
"lastName":"Petrov"},
{"id":2,
"login":"test2",
"password":"$2a$10$6n1MDOTpNIzaV8FDsOb1wOYrlD4y7kb/uYRsw9MaPhYTtbxqOGwLK",
"firstName":"Test",
"secondName":"Testovich",
"lastName":"Testov"}
];
function checkUsers(findBy) {
  if(findBy[item] === users[i][item]) return true;
}

var userStorage = {
  addUser:  function(user) {
              var newUser = {
                id: users.length, 
                login: user.login,
                password: hashPassword( user.password ),
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
  getUser:  function(id) {
              return users[id];
            },
  getAllUsers: function(findBy) {
    return searchUsers(findBy); 
  }           
}

function searchUsers(findBy) {
  return users.filter(function(user) {
    var findByColl = Object.keys(findBy);
    for ( var i = 0; i < findByColl.length; i++ ) {
      var key = findByColl[i];
      if ( findBy[key] != user[key] ) {
        return false;
      } 
    }
    return true;
  });
};

module.exports = {
  userStorage: userStorage,
  users:users
}
