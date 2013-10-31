#! /bin/sh

URL="http://download.odcdn.de/"
NAME="full-data.json.stream"
EXTENSION=".7z"
DEST="./data"

echo "Creating the destination directory..."
if [ ! -d "$DEST" ]; then
  mkdir $DEST
fi

echo "Downloading the file"
wget -O $DEST/$NAME$EXTENSION $URL$NAME$EXTENSION

echo "Extracting the archive"
cd $DEST
7z e $NAME$EXTENSION

#mongod --dbpath /lot/of/freespace
#mongoimport --db geocoder.db --collection data < data/full-data.json.stream

echo "Delete data directory"
cd ..
rm -r $DEST