var http = require('http');
var connect = require('connect');
var static = require('./app/static');
var logger = require('./app/logger');


var app = connect();
app.use(connect.favicon());
app.use(logger());
app.use(static());

var ip = process.env.IP || "localhost";
var port = process.env.PORT || "8080";

http.createServer(app).listen(port, ip);

console.log("Listening at http://" + ip + ":" + port);