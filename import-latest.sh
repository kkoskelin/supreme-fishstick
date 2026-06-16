#!/bin/sh

YEAR=$(date +%Y)

SOURCE=~/Downloads/"${YEAR} Tri County Swim Results - Tri-County.csv"

if [ -f "$SOURCE" ]; then
  echo "Importing from $SOURCE"
  tail -n +2 "$SOURCE" | sed -e "s/,Tri/\/${YEAR},Tri/g" > ./src/fixtures/"${YEAR}.csv"
else
  echo "Source file not found, importing from Google Sheet"
  uv run import_from_gsheet.py
fi

node ./src/fixtures/csvToJson.js ./src/fixtures/*csv