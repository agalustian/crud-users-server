
var users = require('./users');
var camera = require('./cameras');
var util = require('util');

var userStorage = users.userStorage;
var cameraStorage = camera.cameraStorage;

function update(id, changingValues, res, funcName){
  if (changingValues.id) {
    return res.status(500).send('Can\'t change this property: ' + changingValues.id);
  };
  funcName(id, changingValues, function(err, data){
    if(err) {
      return res.status(404).send('not found');
    };
    res.status(200).send('update is sucessfull');
  });
};

function create(newData, res, funcName){
  funcName(newData, function(err, data){
    if (err) {
      return res.status(500).send(err);
    };
    res.status(200).send('created, id: ' + data.id);
  });
};

function findOneDataById(id, res, funcName){
  funcName(id, function(err, data){
    if (err) {
      console.error('can\'t find');
      return res.status(404).send('not found');
    };  
    res.status(200).send(JSON.stringify(data));
  });
};

function findData(query , res, funcName){
  funcName(query, function(err, data){
    if (err) {
      console.error('can\'t find');
      return res.status(404).send('not found');
    } ;
    res.status(200).send(util.format("%j", data));   
  });
};

function remove(id, res, funcName){
  funcName(id, function(err, data){
    if (err) {
      return res.status(404).send('cant delete'); 
    };
    res.status(200).send('deleted');
  });
};


//Users Controller
function createUser(req, res) {
  create(req.body, res, userStorage.addUser);
};

function findUserById(req, res) {
  findOneDataById(req.params.id, res, userStorage.findById);
};

function findUsersData(req, res) {
  findData(req.query, res, userStorage.findUsers);
};

function updateUser(req, res) {
  update(req.params.id, req.body, res, userStorage.editUser);
};

function removeUser(req, res) {
  remove(req.params.id, res, userStorage.delUser);
};

  //Cameras Controller
function createCamera(req, res) {
  create(req.body, res, cameraStorage.addCamera);
};

function findCameraById(req, res) {
  findOneDataById(req.params.id, res, cameraStorage.findById);
};

function findCamerasData(req, res) {
  findData(req.query, res, cameraStorage.findCameras);
};

function updateCamera(req, res) {
  update(req.params.id, req.body, res, cameraStorage.editCamera);
};

function removeCamera(req, res) {
  remove(req.params.id, res, cameraStorage.delCamera);
};

module.exports = {
  createUser: createUser,
  findUserById: findUserById,
  updateUser: updateUser,
  removeUser: removeUser,
  findUsersData:findUsersData,
  createCamera: createCamera,
  findCameraById: findCameraById,
  findCamerasData: findCamerasData,
  updateCamera: updateCamera,
  removeCamera: removeCamera
}