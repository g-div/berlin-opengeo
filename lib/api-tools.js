var fs = require('fs'),
	path = require('path'),
	YAML = require('js-yaml'),
	_ = require('underscore'),
	config = require(path.resolve(__dirname, '../config.js')),
	docs = path.resolve(__dirname, '..', config.documentation),
	argv = {};

var getApiDocumentation = function(docs) {
    return YAML.safeLoad(fs.readFileSync(docs).toString());
};

exports.getApiDocumentation = getApiDocumentation;

var selectOperation = function(operations) {
    return _.find(operations, function(oper) {
        return oper.httpMethod === 'GET';
    });
};

exports.selectOperation = selectOperation;

var selectRequired = function(parameters) {
    return _.chain(parameters).filter(function(param) {
        return param.required == true;
    }).pluck('name').value()
}

exports.selectRequired = selectRequired;

var parseQuery = function (query, params) {
    _.keys(query).forEach(function(key) {
        if (!_.chain(params).pluck('name').contains(key.toString()).value()) {
            delete query[key];
        }
    });
    return query;
}

exports.parseQuery = parseQuery;

module.exports.getArgv = function() {
	var apiConfig = getApiDocumentation(docs);
	apiConfig.apis.forEach(function(api) {
		selectOperation(api.operations).parameters.forEach(function(param) {
			argv[param.name] = {
					"description": param.description,
					"name": param.name
			};
			argv[param.name][param.dataType] = true;
			if (typeof(param.required) !== "undefined") {
				argv[param.name].required = true;
			}
		});
	});
	return argv;
}