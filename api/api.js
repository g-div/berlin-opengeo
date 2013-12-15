#! /usr/bin/node

var express = require('express'),
    http = require('http'),
    path = require('path'),
    _ = require('underscore'),
    config = require(path.resolve(__dirname, '../config.js')),
    db = require('./lib/db.js'),
    response = require('./lib/response.js'),
    swagger = require('swagger-express'),
    YAML = require('require-yaml');


var app = express(),
    docs = path.resolve(__dirname, './docs.yml'),
    apiConfig = require(docs),
    apiURL = apiConfig.resourcePath;


// swagger
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://' + config.api.hostname + ':' + config.api.port + apiURL,
    swaggerUI: './docs',
    apis: [docs]
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

// redirect from the root to the documentation
app.get("/", function(req, res) {
    res.redirect("/docs");
});

// load all routes
function selectOperation(operations) {
    return _.find(operations, function(oper) {
        return oper.httpMethod === 'GET';
    });
}

function selectRequired(parameters) {
    return _.chain(parameters).filter(function(param) {
        return param.required == true;
    }).pluck('name').value()
}

function parseQuery(query, params) {
    _.keys(query).forEach(function(key) {
        if (!_.chain(params).pluck('name').contains(key.toString()).value()) {
            delete query[key];
        }
    });
    return query;
}

function search(parsedQuery) {
    db.searchQuery(parsedQuery, function(doc) {
        response.setResponse(res, doc);
    });
}

apiConfig.apis.forEach(function(api) {
    app.get(apiURL + api.path, function(req, res) {
        var parameters = selectOperation(api.operations).parameters,
            required = selectRequired(parameters),
            parsedQuery = parseQuery(req.query, parameters);

        if (required.length != 0) {
            required.forEach(function(reqm) {
                if (!_.contains(_.keys(parsedQuery), reqm)) {
                    response.errorResponse(res, reqm);
                } else {
                    search(parsedQuery);
                }
            });
        } else {
            search(parseQuery);
        }
    });
});

// start the server
http.createServer(app).listen(config.api.port, function() {
    var urlOfApp = 'http://' + config.api.hostname + ':' + config.api.port;
    console.log('API running at: ' + urlOfApp);
});