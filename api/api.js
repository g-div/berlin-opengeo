var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    assert = require('assert'),
    path = require('path'),
    config = require(path.resolve(__dirname, '../config.js')),
    mongojs = require('mongojs'),
    db = mongojs(config.db),
    swagger = require('swagger-express');

var app = express();

// swagger
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://' + config.api.hostname + ':' + config.api.port + config.api.url,
    swaggerUI: './docs',
    apis: [ path.resolve(__dirname, './docs.yml') ]
}));

// all environments
app.set('port', config.api.hostname);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res) {
    res.title = "Not found";
    res.send(404);
});
// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get("/", function (req, res) {
    res.redirect("/docs");   
});  

var routesDir = path.resolve(__dirname, './routes');
fs.readdir(routesDir, function(err, files) {
    assert.ifError(err);
    files.forEach(function(file) {
        require(path.join(routesDir, file)).init(app);
    });
});

http.createServer(app).listen(config.api.port, function() {
    var urlOfApp = 'http://' + config.api.hostname + ':' + config.api.port;
    console.log('API running at: ' + urlOfApp);
});