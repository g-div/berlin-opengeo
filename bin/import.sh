#! /bin/sh

wget -o $DEST $URL
tar xvfz $DEST
mongod --dbpath /lot/of/freespace
mongoimport --db $config.db --ćollection data < data/full-data.json.stream
