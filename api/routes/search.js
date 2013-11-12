var path = require('path'),
    config = require(path.resolve(__dirname, '../../config.js')),
    db = require(path.resolve(__dirname, '../lib/db.js')),
    parser = require(path.resolve(__dirname, '../lib/parser.js')),
    response = require(path.resolve(__dirname, '../lib/response.js'));

exports.init = function (app) {

    /**
     * @swagger
     * path: /search/
     * operations:
     *   -  httpMethod: GET
     *      summary: Serching without required fields
     *      notes: /!\ Please use carefully /!\
     *      responseClass: Geolocation
     *      nickname: ByParams
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
     *        - name: berzirk_name
     *          paramType: query
     *          description: Bezirksname
     *          dataType: string
     *        - name: berzirk_nr
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
    app.get(config.api.url + '/search/', function (req, res) {

        if(req.query){
            //dbRequest = parser.parseParams(req.query);

            db.searchQuery(req.query, function (doc) {
                response.setResponse(res, doc);
            });
        }else{
            response.setResponse(res, {error : 'empty query. Please enter a valid query.'});
        }

    });

};