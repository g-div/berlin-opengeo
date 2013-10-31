var path = require('path'),
    config = require(path.resolve(__dirname, "../../config.js"));

module.exports.setResponse = function(res, result) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (typeof(config.cors.hostname) && typeof(config.cors.activate)) {
        if (config.cors.activate === true) {
            res.setHeader('Access-Control-Allow-Origin', config.cors.hostname);
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
        }
    }
    res.send(200, result);
    return res;
};