#! /bin/sh

URL="http://download.odcdn.de/"
NAME="full-data.json.stream.7z"
DEST="./data"

echo "Creating the destination directory..."
if [ ! -d "$DEST" ]; then
  mkdir $DEST
fi

echo "Downloading the file"
wget -O $DEST/$NAME $URL$NAME

echo "Extracting the archive"
cd $DEST
7z e $NAME

# mongod --dbpath /lot/of/freespace
# mongoimport --db $config.db --ćollection data < data/full-data.json.stream
