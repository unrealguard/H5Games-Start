var log4js = require('log4js');
var config = require('../config/config');

log4js.configure({
    appenders: [
        { type: "console" }
    ],
    replaceConsole: true
});

var logger = log4js.getLogger();
logger.setLevel('INFO');

console.info('Console logger initialized.');

exports = module.exports = function () {
	console.log('Executing logger module.');
	return log4js.connectLogger(logger, config.logSettings);
}