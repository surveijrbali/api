const functions = require('firebase-functions');
const admin 	= require('firebase-admin');
const joi 		= require('joi')
const constant 	= require('./constant')
const cors      = require('cors');
const jwt       = require('jsonwebtoken')
const express   = require('express');
const axios 	= require('axios')
const authMiddleware = require('./authMiddleware')
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
	joi: joi,
	express: express,
	cors: cors,
	axios: axios,
	jwt: jwt,
	constant: constant,
	authMiddleware: authMiddleware,
	initialize: function (middleware = false) {
		const tmp = express();
		tmp.use(express.json())
		tmp.use(cors({origin: true}))
		if(middleware) tmp.use(authMiddleware)
		return tmp
	},
	send: function (name) {
		return functions.https.onRequest(name)
	},
    db: admin.firestore(),
    addToObject: addToObject
}