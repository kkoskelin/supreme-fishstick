#!/bin/sh

YEAR=$(date +%Y)

SOURCE=~/Downloads/"${YEAR} Tri County Swim Results - Tri-County.csv"

[ -f "$SOURCE" ] && tail -n +2 "$SOURCE" | sed -e "s/,Tri/\/${YEAR},Tri/g" > ./src/fixtures/"${YEAR}.csv"
node ./src/fixtures/csvToJson.js ./src/fixtures/*csv