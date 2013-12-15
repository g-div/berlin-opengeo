var _ = require('underscore'),
    db = require('./db.js'),
    response = require('./response.js');


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

function search(parsedQuery, res) {
    db.searchQuery(parsedQuery, function(doc) {
        response.setResponse(res, doc);
    });
}

module.exports.init = function(app, apiConfig) {
    apiConfig.apis.forEach(function(api) {
        app.get(apiConfig.resourcePath + api.path, function(req, res) {
            var parameters = selectOperation(api.operations).parameters,
                required = selectRequired(parameters),
                parsedQuery = parseQuery(req.query, parameters);

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