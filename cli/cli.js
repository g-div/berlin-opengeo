#! /usr/bin/node

var flatiron = require('flatiron'),
	path = require('path'),
	app = flatiron.app,
	api = require(path.resolve(__dirname, '../lib/api-tools'));

app.use(flatiron.plugins.cli, {
	source: path.join(__dirname, 'lib', 'commands'),
	argv: api.getArgv(),
	usage: ['Usage:', 
		'Simple run node cli.js <command>', '',
		'commands:',
		'  geocodefile - Geocode a CSV or a JSON file',
		'  geocode - Geocode an address using at least one of the parameters below',
		'',
		'Example:',
		'./cli.js geocodefile path/to/file.csv',
		'  or',
		'./cli.js geocode --addresse "Alexanderplatz 1"'
			]
});

app.start();