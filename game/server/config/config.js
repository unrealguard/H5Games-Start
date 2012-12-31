var log4js = require('log4js');

exports = module.exports;

exports.rootDir = __dirname + "/../";

exports.publicDir = exports.rootDir + "../client/";

exports.logSettings = {
	level: log4js.levels.INFO,
	format: ':method :url'
};