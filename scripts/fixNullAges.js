const fs = require('fs');

// Read the data
const data = require('../src/fixtures/swimData.json');

console.log('Original record count:', data.length);
console.log('Records with null age:', data.filter(r => r[0] === null).length);

// Fix the 3 records based on date patterns
let fixedCount = 0;
data.forEach((record, index) => {
  if (record[0] === null) {
    const date = record[2];
    const displayName = record[3];

    if (displayName.includes('Vannieuwenhoven') || displayName.includes('Vannieuwenhove')) {
      const year = date.substring(0, 4);

      if (year === '2021') {
        record[0] = 8;
        console.log(`Fixed record ${index}: ${displayName} on ${date} → age 8`);
        fixedCount++;
      } else if (year === '2022') {
        record[0] = 9;
        console.log(`Fixed record ${index}: ${displayName} on ${date} → age 9`);
        fixedCount++;
      } else {
        console.warn(`⚠️  Unexpected year ${year} for ${displayName}`);
      }
    } else {
      console.warn(`⚠️  Unknown swimmer with null age: ${displayName}`);
    }
  }
});

console.log(`\nFixed ${fixedCount} records`);
console.log('Records with null age after fix:', data.filter(r => r[0] === null).length);

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
