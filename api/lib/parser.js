String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, '');
};

module.exports.parseParams = function(query) {

    var street = query.replace(/\d/gi, ''),
        housenr = /\d{1,3}/.exec(query),
        plz = /\d{5}/.exec(query),
        dbReq = {
            name : street.trim() || '',
            hausnr : typeof housenr !== undefined ? housenr[0].trim() : '',
            plz : typeof plz !== undefined ? plz[0].trim() : ''
        };

    return dbReq;

};