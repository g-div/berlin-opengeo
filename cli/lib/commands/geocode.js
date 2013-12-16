var app,
	path = require('path'),
	_ = require('underscore');

module.exports = function() {
	app = this;

	var query = {},
		keys = Object.keys(this.argv).slice(1);

	keys.length = keys.length - 1;

	keys.forEach(function(argument, i) {
		if (app.argv[argument] == true || app.argv[argument].length <= 0) {
			app.log.error('Please insert a valid value for the following parameter:', argument)
			process.exit();
		}
		if (_.contains(_.keys(app.apitools.getArgv()), argument)) {
			query[argument] = '' + app.argv[argument];
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

	app.db.searchQuery(query, function(data) {
		console.info(data);
		process.exit();
	});

};