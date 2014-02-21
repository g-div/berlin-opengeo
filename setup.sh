#! /bin/sh
set -e

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

# if your mongodb stores data in a folder with to few memory, please chose another one using:
# mongod --dbpath /lot/of/freespace
FREE=$(df -h ./ | grep -vE '^Filesystem|tmpfs'| awk '{ print $4 }' | sed 's/G//')
if [ $FREE -lt 500 ]; then
	echo "There are less than 5 GB freespace"
	echo "Please choose another mongopath:"
	echo "mongod --dbpath /lot/of/freespace"
fi

mongoimport --db geocoder --collection data < data/full-data.json.stream

echo "Clean the destination directory"
cd ..
rm -r $DEST
