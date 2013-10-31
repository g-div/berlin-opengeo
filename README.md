berlin-opengeo
==============

An Open Source geocoder for Berlin based on the data published [here](http://datenjournalist.de/strassen-und-hausnummern-in-berlin-mit-geokoordinaten-als-open-data/).

## Installation
    git clone git@github.com:g-div/berlin-opengeo.git
    cd berlin-opengeo
    chmod +x setup.sh
    ./setup.sh
    npm install

## Start
    npm start
    
or
    
    node api/api.js


## API Documentation

then open your browser at [http://localhost:9987/docs/](http://localhost:9987/docs/) to visit the API documentation


### Requirements:
- wget
- 7zip
- MongoDB
- Node.js
- npm

Built on top of: Node.js, Express, Express-Swagger, Swagger-UI and MongoDB.

### TODOs
- [x] CORS
- [ ] Caching (Redis ?)
- [ ] API-Key Authentification