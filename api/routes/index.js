var path = require('path'),
    config = require(path.resolve(__dirname, '../../config.js')),
    mongojs = require('mongojs'),
    db = mongojs(config.db);

/**
 * @swagger
 * resourcePath: /api/v1
 * description: An Open Source geocoding-system for Berlin
 */

exports.init = function (app) {

    app.setResponse = function setResponse(res, result) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.send(200, result);
        return res;
    };

    /**
     * @swagger
     * path: /
     * operations:
     *   -  httpMethod: GET
     *      summary: Send a request, serching by address
     *      notes: Returns an array of locations
     *      responseClass: Geolocation
     *      nickname: login
     *      consumes: 
     *        - application/json
     *      parameters:
     *        - name: hausnr
     *          description: Hausnummer
     *          paramType: query
     *          required: true
     *          dataType: integer
     */
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