const fs = require('fs');
const csv = require('csv-parser');

const teamKeyMap = {
  'Baraboo': 'B',
  'Cross Plains': 'C',
  'Mazomanie': 'M',
  'MAZO': 'M',
  'Mt. Horeb': 'H',
  'Mt. Horeb': 'H',
  'Sauk Prairie': 'K',
  'Spring Green': 'G',
  'Sun Prairie': 'P',
  'Wis. Dells': 'W',
  'Wis. Dells': 'W',
};

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ skipLines: 0 })) // Skip the first row
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

function convertTimeToSeconds(timeStr) {
  if (timeStr.includes(':')) {
      const [minutes, seconds] = timeStr.split(':');
      const totalSeconds = parseInt(minutes) * 60 + parseFloat(seconds);
      return Math.round(totalSeconds * 100) / 100;
  } else {
      const totalSeconds = parseFloat(timeStr);
      return Math.round(totalSeconds * 100) / 100;
  }
}

function transformEntry(entry) {
  try {
    const place = isNaN(parseInt(entry.Place, 10)) ? undefined : parseInt(entry.Place, 10);
    const eventNumber = parseInt(entry['Event #'].replace('#', ''), 10);

    const [month, day, year] = entry.Date.split('/');
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if(!teamKeyMap[entry.Team]) {
      console.error("Couldn't find entry for ", entry.Team)
    }

    const objectFormat = {
      age: parseInt(entry.Age, 10),
      convertedTime: convertTimeToSeconds(entry['Converted Time']),
      date: formattedDate,
      displayName: `${entry['Last Name']}, ${entry['First Name']}`,
      event: eventNumber,
      league: entry.League,
      place: place ?? 0,
      team: teamKeyMap[entry.Team],
      weekNumber: parseInt(entry.Week.replace('Week ', ''), 10)
    };

    const arrayFormat = [
      objectFormat.age,
      objectFormat.convertedTime,
      objectFormat.date,
      objectFormat.displayName,
      objectFormat.event,
      objectFormat.place,
      objectFormat.team,
      objectFormat.weekNumber,
    ];
    return arrayFormat;
  } catch (error) {
    console.error('Error transforming entry:', entry, error);
    throw e;
  }
}

function writeJSON(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

(async()=>{
  const args = process.argv.slice(2);
  const jsonFilePath = './swimData.json';
  const records = [];
  for (let file of args) {
    const csvData = await readCSV(file);
    records.push(... csvData.map(transformEntry))
  }

  try {
    await writeJSON(jsonFilePath, records);
    console.log('CSV has been converted to JSON successfully.');
  } catch (error) {
    console.error('Error processing CSV to JSON:', error);
  }
})();
