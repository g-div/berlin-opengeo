var app,
	flatiron = require('flatiron'),
	path = require('path'),
	db = require(path.resolve(__dirname, '../../../lib/db'));

module.exports = function() {
	app = this;

	var query = {},
		keys = Object.keys(this.argv).slice(1),
		that = this;

	keys.length = keys.length - 1;

	keys.forEach(function(e, i) {
		if (that.argv[e] == true || that.argv[e].length <= 0) {
			app.log.error("Please insert a valid value for the following parameter:", e)
			process.exit();
		}
		query[e] = '' + that.argv[e];
	});

	if (keys.length == 0) {
		app.log.error("Please pass at least one field.");
		process.exit();
	}

	db.searchQuery(query, function(data) {
		console.info(data);
		process.exit();
	});

};