var connect = require('connect');
var config = require('../config/config');


module.exports = exports = function static() {
	console.info('Executing static module.');
	console.info('Serving files from %s', config.publicDir);
	
	return connect.static(config.publicDir);
};