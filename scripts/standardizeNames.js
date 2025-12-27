const fs = require('fs');

// Read the data
const data = require('../src/fixtures/swimData.json');

console.log('Original record count:', data.length);

// Find all variations of the name
const variations = new Set();
data.forEach(record => {
  const name = record[3];
  if (name && (name.includes('Vannieuwenhoven') || name.includes('Vannieuwenhove'))) {
    variations.add(name);
  }
});

console.log('\nFound name variations:');
variations.forEach(name => console.log(`  - ${name}`));

// Standardize to "Vannieuwenhoven, Sloan"
const standardName = 'Vannieuwenhoven, Sloan';
let fixedCount = 0;

data.forEach((record, index) => {
  const name = record[3];
  if (name && name !== standardName && (name.includes('Vannieuwenhoven') || name.includes('Vannieuwenhove'))) {
    console.log(`Fixing record ${index}: "${name}" → "${standardName}"`);
    record[3] = standardName;
    fixedCount++;
  }
});

console.log(`\nStandardized ${fixedCount} records to: ${standardName}`);

// Write back to file
fs.writeFileSync(
  './src/fixtures/swimData.json',
  JSON.stringify(data),
  'utf8'
);

console.log('\n✓ Updated swimData.json');
console.log('\nNext steps:');
console.log('1. Review the changes: git diff src/fixtures/swimData.json');
console.log('2. Re-run migration: npm run migrate');
