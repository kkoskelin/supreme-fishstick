const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Validate environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('ERROR: Missing required environment variables');
  console.error('Please ensure .env.local contains:');
  console.error('  - SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Use service role for admin operations
);

async function migrateData() {
  try {
    console.log('=== Supabase Migration Script ===\n');
    console.log('Starting migration...');

    // Read existing JSON data
    const rawData = require('../src/fixtures/swimData.json');
    console.log(`Found ${rawData.length.toLocaleString()} records to migrate\n`);

    // Transform to match database schema
    // swimData.json format: [age, convertedTime, date, displayName, event, place, team, weekNumber]
    const records = rawData.map(record => ({
      age: record[0],
      converted_time: record[1],
      date: record[2],
      display_name: record[3],
      event: record[4],
      place: record[5],
      team: record[6],
      week_number: record[7]
    }));

    // Clear existing data (optional - comment out if you want to preserve)
    console.log('Clearing existing records...');
    const { error: deleteError } = await supabase
      .from('swim_records')
      .delete()
      .neq('id', 0);  // Delete all records

    if (deleteError) {
      console.warn('⚠️  Could not clear existing data:', deleteError.message);
      console.warn('Continuing with migration...\n');
    } else {
      console.log('✓ Existing records cleared\n');
    }

    // Insert in batches (Supabase limit is 1000 per batch)
    const batchSize = 1000;
    let successCount = 0;
    let errorCount = 0;
    const startTime = Date.now();

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(records.length / batchSize);

      process.stdout.write(`Processing batch ${batchNum}/${totalBatches} (${batch.length} records)...`);

      const { data, error } = await supabase
        .from('swim_records')
        .insert(batch)
        .select('id');

      if (error) {
        console.log(` ✗ ERROR`);
        console.error(`   Error details:`, error.message);
        errorCount += batch.length;
      } else {
        console.log(` ✓`);
        successCount += data.length;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n=== Migration Complete ===');
    console.log(`Duration: ${duration} seconds`);
    console.log(`Total records: ${records.length.toLocaleString()}`);
    console.log(`Successfully migrated: ${successCount.toLocaleString()}`);
    console.log(`Errors: ${errorCount.toLocaleString()}`);

    // Verify data
    console.log('\n=== Verification ===');
    const { count, error: countError } = await supabase
      .from('swim_records')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('✗ Error verifying count:', countError.message);
    } else {
      console.log(`✓ Database now contains: ${count?.toLocaleString()} records`);
    }

    // Sample queries
    console.log('\n=== Sample Queries ===');

    const { data: dateRange } = await supabase
      .from('swim_records')
      .select('date')
      .order('date', { ascending: true })
      .limit(1)
      .single();

    const { data: latestDate } = await supabase
      .from('swim_records')
      .select('date')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (dateRange && latestDate) {
      console.log(`Date range: ${dateRange.date} to ${latestDate.date}`);
    }

    const { data: teamCounts } = await supabase
      .from('swim_records')
      .select('team')
      .limit(10000);

    if (teamCounts) {
      const teams = {};
      teamCounts.forEach(r => {
        teams[r.team] = (teams[r.team] || 0) + 1;
      });
      console.log('Records by team:', teams);
    }

    console.log('\n✓ Migration successful!\n');

  } catch (error) {
    console.error('\n✗ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run migration
migrateData();
