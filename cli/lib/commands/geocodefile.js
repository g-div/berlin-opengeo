var app,
	fs = require('fs'),
	path = require('path'),
	async = require('async'),
	_ = require('underscore'),
	dsv = require("dsv"),
	csv = dsv(","),
	db = require(path.resolve(__dirname, '../../../lib/db')),
	headers = [],
	results = [];


function search(query, callback) {
	db.searchQuery(query, function(data) {
		results.push(data);
		callback();
	});
};

function processFile(file) {
	app.log.info('Geocoding the file: ' + file);
	try {
		fs.readFile(file, function(err, content) {
			if (err) {
				app.log.error('Error reading the input file. Do the file really exists ?');
				process.exit();
			}

			async.forEach(csv.parse(content.toString()), search, function(err) {
				if (err) app.log.error('An error occurred connecting to the database');
				console.log(_.flatten(results));
				process.exit();				
			});
		});
	} catch (e) {
		app.log.error('Error reading the input file. Do the file really exists ?');
		process.exit();
	};
};

module.exports = function(file) {
	app = this;

	if (typeof(file) === 'function') {
		app.log.warn('Please enter a valid filename')
		app.prompt.get('filename', function(err, result) {
			processFile(result.filename);
		});
	} else {
		processFile(file);
	}
};;