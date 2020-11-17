const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()


var addToObject = function (obj, key, value, index) {
	var temp = {};
	var i = 0;
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			if (i === index && key && value) {
				temp[key] = value;
			}
			temp[prop] = obj[prop];
			i++;
		}
	}
	if (!index && key && value) {
		temp[key] = value;
	}
	return temp;
};

module.exports ={
    functions : functions,
    admin : admin,
    db: admin.firestore(),
    addToObject: addToObject
}