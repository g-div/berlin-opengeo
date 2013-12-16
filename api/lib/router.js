var _ = require('underscore'),
    path = require('path'),
    db = require(path.resolve(__dirname, '../../lib/db')),
    response = require(path.resolve(__dirname, 'response')),
    apitools = require(path.resolve(__dirname, '../../lib/api-tools'));


function search(parsedQuery, res) {
    db.searchQuery(parsedQuery, function(doc) {
        response.setResponse(res, doc);
    });
}

module.exports.init = function(app, apiConfig) {
    apiConfig.apis.forEach(function(api) {
        app.get(apiConfig.resourcePath + api.path, function(req, res) {
            var parameters = apitools.selectOperation(api.operations).parameters,
                required = apitools.selectRequired(parameters),
                parsedQuery = apitools.parseQuery(req.query, parameters);

            if (required.length != 0) {
                required.forEach(function(reqm) {
                    if (!_.contains(_.keys(parsedQuery), reqm)) {
                        response.errorResponse(res, reqm);
                    } else {
                        search(parsedQuery, res);
                    }
                });
            } else {
                search(parseQuery, res);
            }
        });
    });
}