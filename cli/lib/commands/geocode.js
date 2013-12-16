var app,
	flatiron = require('flatiron'),
	path = require('path'),
	_ = require('underscore'),
	db = require(path.resolve(__dirname, '../../../lib/db')),
	apitools = require(path.resolve(__dirname, '../../../lib/api-tools'));


module.exports = function() {
	app = this;

	var query = {},
		keys = Object.keys(this.argv).slice(1),
		that = this;

	keys.length = keys.length - 1;

	keys.forEach(function(argument, i) {
		if (that.argv[argument] == true || that.argv[argument].length <= 0) {
			app.log.error('Please insert a valid value for the following parameter:', argument)
			process.exit();
		}
		if (_.contains(_.keys(apitools.getArgv()), argument)) {
			query[argument] = '' + that.argv[argument];
		} else {
			app.log.error('Parameter unknow:', argument);
			app.log.error('Please read the documentation or run "node cli/cli.js" (without any additional command) for help.')
			process.exit()
		}
	});

	if (keys.length == 0) {
		app.log.error('Please pass at least one field.');
		process.exit();
	}

	db.searchQuery(query, function(data) {
		console.info(data);
		process.exit();
	});

};