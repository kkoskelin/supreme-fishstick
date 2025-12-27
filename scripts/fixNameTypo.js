const fs = require('fs');

// Read the data
const data = require('../src/fixtures/swimData.json');

console.log('Original record count:', data.length);

// Find all variations
const vannieuwenhoveRecords = data.filter(r =>
  r[3] && r[3].includes('Vannieuwenhove')
);

console.log(`\nFound ${vannieuwenhoveRecords.length} records with "Vannieuwenhove" (missing 'n')`);

// Fix only the typo: Vannieuwenhove → Vannieuwenhoven (preserves first name)
let fixedCount = 0;
data.forEach((record, index) => {
  const name = record[3];
  if (name && name.includes('Vannieuwenhove,')) {
    const correctedName = name.replace('Vannieuwenhove', 'Vannieuwenhoven');
    console.log(`Fixing record ${index}: "${name}" → "${correctedName}"`);
    record[3] = correctedName;
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} records (typo correction only)`);

// Verify the distinct names remaining
const vannieuwenhovenNames = new Set();
data.forEach(record => {
  const name = record[3];
  if (name && name.includes('Vannieuwenhoven')) {
    vannieuwenhovenNames.add(name);
  }
});

console.log('\nDistinct Vannieuwenhoven names after fix:');
vannieuwenhovenNames.forEach(name => console.log(`  - ${name}`));

// Write back to file
fs.writeFileSync(
  './src/fixtures/swimData.json',
  JSON.stringify(data),
  'utf8'
);

console.log('\n✓ Updated swimData.json');
console.log('\nNext step: npm run migrate');
