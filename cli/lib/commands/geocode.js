var app,
	db = require('../../../api/lib/db'),
	flatiron = require('flatiron');

function processFile() {
	app.log.info('File: ');
}

module.exports = function() {
	app = this;
	app.use(flatiron.plugins.cli, {

		argv: {
			verbose: {
				alias: 'v',
				description: 'print all errors',
				boolean: true
			},
			hausnr: {
				alias: 'hn',
				description: 'define the number of the house',
				string: true
			},
			name: {
				alias: 'n',
				description: 'define the name of the street',
				string: true
			},
			plz : {
				alias: 'p',
				description: 'define the postal code of the address',
				string: true
			}
		}
	});

	var query = {},
		keys = Object.keys(this.argv).slice(1),
		that = this;

		keys.length = keys.length - 1;
		
		keys.forEach(function(e,i){
			query[e] = '' + that.argv[e];
		})

		console.log( query )
	
	db.searchQuery( query, function(data){
		console.info(data);
	});

	
};