var app;

function processFile(file) {
	app.log.info('File: ' + file);
}

module.exports = function(file) {
	app = this;

	if (typeof(file) === "function") {
		app.log.warn("Please enter a valid filename")
		app.prompt.get("filename", function(err, result) {
			processFile(result.filename);
		});
	} else {
		processFile(file);
	}	
};