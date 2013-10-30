var path = require('path'),
    config = require(path.resolve(__dirname, '../../config.js')),
    mongojs = require('mongojs'),
    db = mongojs(config.db);

exports.init = function (app) {

    app.setResponse = function setResponse(res, result) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.send(200, result);
        return res;
    };

    app.get(config.api.url, function (req, res) {

        db.collection('data').find(req.query, function (err, doc) {
            app.setResponse(res, doc);
        });

    });

    app.get(config.api.url + '/search/', function (req, res) {
        parseParams(req);

        db.collection('data').find(req.query, function (err, doc) {
            app.setResponse(res, doc);
        });

    });
};