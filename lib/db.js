var path = require('path'),
    mongojs = require('mongojs'),
    config = require(path.resolve(__dirname, "../config.js")),
    db = mongojs(config.db);

module.exports.searchQuery = function(query, callback) {
    db.collection('data').find(query, function (err, doc) {
        callback(doc);
    });   
}

module.exports.closeDB = function() {
	db.close();
}