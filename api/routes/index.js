var path = require('path'),
    config = require(path.resolve(__dirname, '../../config.js')),
    db = require(path.resolve(__dirname, '../lib/db.js')),
    parser = require(path.resolve(__dirname, '../lib/parser.js')),
    response = require(path.resolve(__dirname, '../lib/response.js'));

exports.init = function (app) {

    app.get(config.api.url, function (req, res) {

        db.searchQuery(req.query, function (doc) {
            response.setResponse(res, doc);
        });

    });    
    
};