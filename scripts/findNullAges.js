const data = require('../src/fixtures/swimData.json');

// Find all records for Vannieuwenhoven/Vannieuwenhove
const swimmer = data.filter(r =>
  r[3] && (r[3].includes('Vannieuwenhoven') || r[3].includes('Vannieuwenhove'))
);

console.log('Total records for this swimmer:', swimmer.length);
console.log('\nRecords WITH ages:');
swimmer
  .filter(r => r[0] !== null)
  .forEach(r => console.log(`  Age: ${r[0]}, Date: ${r[2]}, Event: ${r[4]}, Time: ${r[1]}`));

console.log('\nRecords WITHOUT ages:');
swimmer
  .filter(r => r[0] === null)
  .forEach(r => console.log(`  Age: null, Date: ${r[2]}, Event: ${r[4]}, Time: ${r[1]}`));

// Check which year these records are from
console.log('\n--- Analysis ---');
const nullAgeRecords = swimmer.filter(r => r[0] === null);
const withAgeRecords = swimmer.filter(r => r[0] !== null);

if (withAgeRecords.length > 0) {
  const ages = withAgeRecords.map(r => r[0]);
  console.log('Ages from other records:', [...new Set(ages)].sort());

  // Group by year
  const years = {};
  withAgeRecords.forEach(r => {
    const year = r[2].substring(0, 4);
    if (!years[year]) years[year] = [];
    years[year].push(r[0]);
  });
  console.log('\nAges by year:');
  Object.keys(years).sort().forEach(year => {
    const uniqueAges = [...new Set(years[year])].sort();
    console.log(`  ${year}: ages ${uniqueAges.join(', ')}`);
  });
}

console.log('\nNull age records are from:');
nullAgeRecords.forEach(r => {
  const year = r[2].substring(0, 4);
  console.log(`  ${year} (${r[2]})`);
});
