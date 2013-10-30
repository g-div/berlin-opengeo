
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    assert = require('assert'),
    path = require('path'),
    config = require(path.resolve(__dirname, '../config.js')),
    mongojs = require('mongojs'),
    db = mongojs(config.db);

var app = express();

// all environments
app.set('port', config.api.hostname);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res) {
  res.status(404).render('404.html', {title: 'Not found, 404'});
});
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

var routesDir = './routes';
fs.readdir(routesDir, function (err, files) {
  assert.ifError(err);
  files.forEach(function (file) {
    require(path.join(__dirname, routesDir, file)).init(app);
  });
});

http.createServer(app).listen(config.api.port, function(){
  var urlOfApp = 'http://' + config.api.hostname + ':' + config.api.port;
  console.log('server running : ' + urlOfApp);
});
