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
    apibox-serve
    
or
    
    apibox-cli

for the command-line interface.

## API Documentation

Open your browser at [http://localhost:9987/docs/](http://localhost:9987/docs/) to visit the API documentation


### Requirements:
- **~5 GB** of **FREESPACE**
- wget
- 7zip
- MongoDB
- Node.js
- npm

Built on top of [apibox](https://github.com/g-div/apibox)