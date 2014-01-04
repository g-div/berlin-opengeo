var fs = require('fs'),
	path = require('path'),
	YAML = require('js-yaml'),
	_ = require('underscore'),
	dsv = require('dsv'),
	csv = dsv(','),
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

var parseQuery = function(query, params) {
	_.keys(query).forEach(function(key) {
		if (!_.chain(params).pluck('name').contains(key.toString()).value()) {
			delete query[key];
		}
	});
	return query;
}

exports.parseQuery = parseQuery;

var argvKeys = [];
var getArgv = function() {
	var apiConfig = getApiDocumentation(docs);
	apiConfig.apis.forEach(function(api) {
		selectOperation(api.operations).parameters.forEach(function(param) {
			argvKeys.push(param.name);
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

exports.getArgv = getArgv;


module.exports.processPrint = function(data, toPrint, args, format) {
	var result = {};
	if (toPrint.length == 0) toPrint = argvKeys;
	toPrint.forEach(function(print) {
		if (_.contains(args, print)) {
			result[print] = _.pluck(data, print).toString();
		}
	});

	(format === true) ? console.info(csv.format([result])) : console.info(result);
}