var app,
	_ = require('underscore'),
	flatiron = require('flatiron'),
	YAML = require('js-yaml'),
	path = require('path'),
	fs = require('fs'),
	db = require(path.resolve('./lib/db')),
	config = require(path.resolve('./config.js')),
	docs = path.resolve(config.documentation),
	apiConfig = getApiDocumentation(),
	argv = {};

function getApiDocumentation() {
    return YAML.safeLoad(fs.readFileSync(docs).toString());
};

function selectOperation(operations) {
    return _.find(operations, function(oper) {
        return oper.httpMethod === 'GET';
    });
};

apiConfig.apis.forEach(function(api) {
	selectOperation(api.operations).parameters.forEach(function(param) {
		argv[param.name] = {
				"description": param.description
		};
		argv[param.name][param.dataType] = true;
	});
});

module.exports = function() {
	app = this;
	app.use(flatiron.plugins.cli, {argv: argv});

	var query = {},
		keys = Object.keys(this.argv).slice(1),
		that = this;

		keys.length = keys.length - 1;
		
		keys.forEach(function(e,i){
			query[e] = '' + that.argv[e];
		})
	
	db.searchQuery(query, function(data){
		console.info(data);
		process.exit();
	});
	
};