#! /usr/bin/node

var flatiron = require('flatiron'),
	path = require('path'),
	app = flatiron.app,
	api = require(path.resolve('./lib/api-tools'));

app.use(flatiron.plugins.cli, {
	source: path.join(__dirname, 'lib', 'commands'),
	argv: api.getArgv(),
	usage: ['Usage:', 
		'Simple run node cli.js <command>', '',
		'commands:',
		'  geocodefile - Geocode a CSV or a JSON file',
		'  geocode - Geocode an address using the following parameters',
			]
});

app.start();