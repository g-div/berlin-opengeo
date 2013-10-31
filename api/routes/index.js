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

    String.prototype.trim = function(){
        return this.replace(/^\s+|\s+$/g, '');
    }

    app.parseParams = function parseParams(query){
        var street = query.replace(/\d/gi, ''),
            housenr = /\d{1,3}/.exec(query),
            plz = /\d{5}/.exec(query),
            dbReq = {
                name : street.trim() || '',
                hausnr : typeof housenr !== undefined ? housenr[0].trim() : '',
                plz : typeof plz !== undefined ? plz[0].trim() : ''
            };

        return dbReq;
    }

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
     *      notes: Returns an array of geolocations-objects
     *      responseClass: Geolocation
     *      nickname: login
     *      consumes: 
     *        - application/json
     *      parameters:
     *        - name: strnr
     *          description: ?
     *          paramType: query
     *          dataType: integer
     *        - name: lat
     *          paramType: query
     *          description: Latitude
     *          dataType: float
     *        - name: lon
     *          paramType: query
     *          description: Longitude
     *          dataType: float
     *        - name: hausnr
     *          description: Hausnummer
     *          paramType: query
     *          dataType: integer
     *          minimum: 000
     *          maximum: 999
     *        - name: name
     *          description: Straße
     *          paramType: query
     *          required: true
     *          dataType: string
     *        - name: nummer
     *          paramType: query
     *          description: ?
     *          dataType: integer
     *        - name: addresse
     *          paramType: query
     *          description: Adresse
     *          dataType: string
     *        - name: plz
     *          paramType: query
     *          description: Postleitzahl
     *          dataType: integer
     *        - name: bezirk_name
     *          paramType: query
     *          description: Bezirksname
     *          dataType: string
     *        - name: bezirk_nr
     *          paramType: query
     *          description: Bezirksnummer
     *          dataType: integer
     *        - name: ortsteil_name
     *          paramType: query
     *          description: Ortsteil
     *          dataType: string
     *        - name: ortsteil_nr
     *          paramType: query
     *          description: Ortsteilnummer
     *          dataType: integer
     *        - name: strasse_nr
     *          paramType: query
     *          description: Straßenummer
     *          dataType: integer
     *        - name: strasse_abschnitt_nr
     *          paramType: query
     *          description: Straßenabschnittsnummer
     *          dataType: integer
     *        - name: karten
     *          paramType: query
     *          description: Kartenmaßstab
     *          dataType: integer
     *        - name: soldner_x
     *          paramType: query
     *          description: ?
     *          dataType: integer
     *        - name: soldner_y
     *          paramType: query
     *          description: ?
     *          dataType: integer
     *        - name: stat_gebiet
     *          paramType: query
     *          description: Statistische Gebiet
     *          dataType: integer
     *        - name: stat_block
     *          paramType: query
     *          description: Statistische Blockeinheit
     *          dataType: integer
     *        - name: einschulungsbezirk
     *          paramType: query
     *          description: Einschulungsbezirksnummer
     *          dataType: integer
     *        - name: verkehrsflaeche
     *          paramType: query
     *          description: Verkehrsfläche
     *          dataType: integer
     *        - name: verkehrsteilflaeche
     *          paramType: query
     *          description: Verkehrsteilfläche
     *          dataType: integer
     *        - name: mittelbereich
     *          paramType: query
     *          description: Mittelbereich
     *          dataType: integer
     *        - name: prognoseraum_name
     *          paramType: query
     *          description: Prognoseraumsname
     *          dataType: string
     *        - name: prognoseraum_nr
     *          paramType: query
     *          description: Prognoseraumsnummer
     *          dataType: integer
     *        - name: bezirksregion_name
     *          paramType: query
     *          description: Bezirksregionsname
     *          dataType: string
     *        - name: bezirksregion_nr
     *          paramType: query
     *          description: Bezirksregionsnummer
     *          dataType: integer
     *        - name: planungsraum_name
     *          paramType: query
     *          description: Planungsraumsname
     *          dataType: string
     *        - name: planungsraum_nr
     *          paramType: query
     *          description: Planungsraumsnummer
     *          dataType: integer
     *        - name: finanzamt_nr
     *          paramType: query
     *          description: Nummer des zuständiges Finanzamt
     *          dataType: integer
     *        - name: finanzamt_addr
     *          paramType: query
     *          description: Adresse des zuständiges Finanzamt
     *          dataType: string
     *            
     */
    app.get(config.api.url, function (req, res) {

        db.collection('data').find(req.query, function (err, doc) {
            app.setResponse(res, doc);
        });
    });
    /**
     * @swagger
     * models:
     *   Geolocation:
     *     id: _id
     *     properties:
     *       name:
     *         type: String
     *       nummer:
     *         type: Integer    
     */
    

    app.get(config.api.url + '/search/', function (req, res) {

        // search query, show error if emtpy
        var query = req.query.q;

        if(query){
            dbRequest = app.parseParams(query);

            console.log(dbRequest);

            db.collection('data').find(dbRequest, function (err, doc) {
                app.setResponse(res, doc);
            });
        }else{
            app.setResponse(res, {error : 'empty query. Please enter a valid query.'});
        }

    });
};