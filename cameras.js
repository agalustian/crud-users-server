
var CameraModel = require('./libs/db').CameraModel;

var cameraStorage = {
	addCamera: function(newCameraData, callback) {
		var newCamera = new CameraModel(newCameraData);
		newCamera.save(function(err, camera){
			if (err) {
				return callback(err.message);
			};
			callback(null, camera);
		})
	},
	editCamera:function(cameraId, changingValues, callback) {
		CameraModel.findById({'_id': cameraId}, function(err, camera){
			if (err || camera === null){
				return callback(err);
			};

			camera.name = changingValues.name || camera.name,
			camera.ip = changingValues.ip || camera.ip,
			camera.address = changingValues.address || camera.address,
			camera.longitude = changingValues.longitude || camera.longitude,
			camera.latitude =  changingValues.latitude || camera.latitude

			camera.save(function(err, camera){
				if (err) {
					return callback(err.message);
				};
				callback(null, camera);
			})
		});
	},
	delCamera:function(id, callback) {
		CameraModel.findById({'_id': id}, function(err, camera){
			if (err || camera === null) {
				return callback('not found');
			};
			camera.remove(function(err, data){
				if (err) {
					return callback(err);
				};
				callback(null, data);
			});
		});
	},
	findById:function(id, callback) {
		CameraModel.findById({'_id': id}, function(err, camera){
			if (err || camera === null) {
				return callback('not found');
			};
			callback(null, camera);
		});
	},
	findCameras: function(findBy, callback) {
		CameraModel.find(findBy, function(err, data){
			if (err || data === null) {
				return callback('not found');
			};
			callback(null, data);
		})
	}
}

module.exports = {
	cameraStorage: cameraStorage
}