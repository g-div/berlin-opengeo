#! /usr/bin/node

var flatiron = require('flatiron'),
	path = require('path'),
	app = flatiron.app;

app.config.file({
	file: path.join(__dirname, '..', 'config.json')
});

app.use(flatiron.plugins.cli, {
	source: path.join(__dirname, 'lib', 'commands'),
	usage: ['Usage:', 
		'Simple run node cli.js <command>', '',
		'commands:',
		'  geocodefile - Geocode a CSV or a JSON file',
		'  geocode - Geocode an address',
			]
});

app.start();