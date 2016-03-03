/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _fs = __webpack_require__(2);

	var _fs2 = _interopRequireDefault(_fs);

	var _lodash = __webpack_require__(3);

	var _lodash2 = _interopRequireDefault(_lodash);

	var app = (0, _express2['default'])();
	var port = process.env.PORT || 3000;

	var users = [];

	_fs2['default'].readFile('users.json', { encoding: 'utf8' }, function (err, data) {
		if (err) throw err;

		JSON.parse(data).forEach(function (user) {
			user.name.full = _lodash2['default'].startCase(user.name.first + ' ' + user.name.last);
			users.push(user);
		});
	});

	app.get('/', function (req, res) {
		var buffer = '';

		users.forEach(function (user) {
			buffer += '<a href="' + user.username + '">' + user.name.full + '</a><br>';
		});
		res.send(buffer);
	});

	app.get(/big.*/, function (req, res, next) {
		console.log('BIG USER ACCESS');
		next();
	});

	app.get(/.*dog.*/, function (req, res, next) {
		console.log('DOGS GO WOOF');
		next();
	});

	app.get('/:username', function (req, res) {
		var username = req.params.username;
		res.send(username);
	});

	app.listen(port, function () {
		console.log('Server running at http://localhost: ' + port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ }
/******/ ]);