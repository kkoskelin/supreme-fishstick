# Migration Plan: Vercel + Supabase (3-Step Approach)

## Overview
This plan migrates from GitHub Pages to Vercel + Supabase using clean architecture principles. Work happens on a feature branch while users continue accessing the production site on GitHub Pages.

**Branch Strategy**:
- `main` branch → GitHub Pages (production, unchanged)
- `feature/vercel-supabase-migration` → Vercel deployment (development)
- Merge to main only after full verification

**Key Principles**:
- ✅ Maintain abstraction layers (gateways separate from implementation)
- ✅ Follow clean architecture patterns
- ✅ Keep interfaces stable while swapping implementations
- ✅ Zero production impact until final merge

---

## Step 1: Deploy to Vercel + Setup Supabase

**Goal**: Establish infrastructure and deploy current app with NO behavior changes

**Time Estimate**: 3-4 hours

### 1.1: Create Accounts & Install Tools

```bash
# Install Vercel CLI
npm install -g vercel

# Install Supabase client library
npm install @supabase/supabase-js

# Install types
npm install --save-dev @vercel/node dotenv
```

Create accounts:
1. Vercel account at vercel.com (use GitHub login)
2. Supabase account at supabase.com (use GitHub login)

### 1.2: Configure Vercel for Feature Branch Deployment

**Update Build Configuration**:
1. In Vercel dashboard, import project from GitHub
2. Configure build settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `./`
   - **Node Version**: 18

3. Configure Git integration:
   - Production Branch: `main` (disable for now, or leave for future)
   - Deploy only: `feature/vercel-supabase-migration`

### 1.3: Update GitHub Actions (Optional)

Create `.github/workflows/vercel-preview.yml`:
```yaml
name: Vercel Preview Deployment
on:
  push:
    branches:
      - feature/vercel-supabase-migration

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```

**Note**: This is optional - Vercel's native GitHub integration may be sufficient.

### 1.4: Initial Deployment Test

```bash
# Commit current state
git add .
git commit -m "Setup: Add Vercel and Supabase dependencies"

# Push to trigger deployment
git push -u origin feature/vercel-supabase-migration
```

**Verify**:
- Site deploys to Vercel at preview URL
- All existing functionality works
- GitHub Pages (main branch) unaffected

### 1.5: Create Supabase Project

1. In Supabase dashboard, click "New Project"
2. Project settings:
   - **Name**: tri-county-swim-records
   - **Database Password**: (generate strong password, save in password manager)
   - **Region**: East US (or closest to users)
   - **Pricing Plan**: Free

3. Wait for provisioning (~2 minutes)

4. Save connection details:
   - Project URL: `https://[project-id].supabase.co`
   - API Keys: Project Settings → API
     - `anon` public key (for client use)
     - `service_role` secret key (for admin operations)

### 1.6: Design Database Schema

In Supabase SQL Editor, run:

```sql
-- Create swim_records table
CREATE TABLE swim_records (
  id BIGSERIAL PRIMARY KEY,
  age INTEGER NOT NULL,
  converted_time DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  display_name TEXT NOT NULL,
  event INTEGER NOT NULL,
  place INTEGER NOT NULL,
  team VARCHAR(1) NOT NULL,
  week_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for query performance
CREATE INDEX idx_swim_records_display_name ON swim_records(display_name);
CREATE INDEX idx_swim_records_event ON swim_records(event);
CREATE INDEX idx_swim_records_date ON swim_records(date);
CREATE INDEX idx_swim_records_team ON swim_records(team);
CREATE INDEX idx_swim_records_composite ON swim_records(event, date, converted_time);

-- Enable Row Level Security
ALTER TABLE swim_records ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view records)
CREATE POLICY "Allow public read access" ON swim_records
  FOR SELECT TO anon USING (true);

-- Restrict write access (only authenticated service role can insert/update/delete)
CREATE POLICY "Allow service role write access" ON swim_records
  FOR ALL TO authenticated USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-update updated_at
CREATE TRIGGER update_swim_records_updated_at
  BEFORE UPDATE ON swim_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 1.7: Load Test Data

1. Extract 20 test records from `src/fixtures/2025.csv`:
```bash
head -n 21 src/fixtures/2025.csv > src/fixtures/test-sample.csv
```

2. In Supabase dashboard:
   - Navigate to Table Editor → swim_records
   - Click "Insert" → "Import data via CSV"
   - Upload `test-sample.csv`
   - Map CSV columns to database columns
   - Import

3. Verify in SQL Editor:
```sql
-- Check record count
SELECT COUNT(*) FROM swim_records;

-- View sample records
SELECT * FROM swim_records LIMIT 5;

-- Test a search query
SELECT * FROM swim_records
WHERE display_name ILIKE '%Smith%'
ORDER BY converted_time ASC;
```

### 1.8: Configure Environment Variables

Create `.env.local` (local development):
```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-key-here
```

Update `.gitignore`:
```
# Environment files
.env.local
.env*.local

# Vercel
.vercel
```

Add to Vercel project (Project Settings → Environment Variables):
- `SUPABASE_URL`: (your Supabase project URL)
- `SUPABASE_ANON_KEY`: (your anon key)
- `SUPABASE_SERVICE_ROLE_KEY`: (your service role key - for migrations only)

### 1.9: Commit Infrastructure Setup

```bash
git add .gitignore package.json package-lock.json
git commit -m "Setup: Configure Supabase environment"
git push
```

**Step 1 Deliverables**:
- ✅ Vercel deployment working on feature branch
- ✅ Supabase project created with schema
- ✅ Test data loaded and queryable
- ✅ Environment variables configured
- ✅ Production (main/GitHub Pages) unaffected

---

## Step 2: Build API + Migrate Data

**Goal**: Create backend API with clean architecture and load all swim records

**Time Estimate**: 4-5 hours

### 2.1: Create API Gateway Interface (Clean Architecture)

Create `src/gateways/ISwimDataGateway.ts`:
```typescript
import { RawSwimRecord } from '../types/RawSwimRecord';

export interface SwimDataFilter {
  swimmerName?: string;
  team?: string;
  event?: number;
  year?: string;
  limit?: number;
}

export interface ISwimDataGateway {
  /**
   * Fetch swim records with optional filters
   */
  fetchRecords(filter?: SwimDataFilter): Promise<RawSwimRecord[]>;

  /**
   * Get the most recent swim record date
   */
  getLatestDate(): Promise<string>;

  /**
   * Get all unique swimmer names for autocomplete
   */
  getSwimmerNames(): Promise<string[]>;
}
```

### 2.2: Create Static Data Gateway (Current Implementation)

Create `src/gateways/StaticSwimDataGateway.ts`:
```typescript
import { ISwimDataGateway, SwimDataFilter } from './ISwimDataGateway';
import { RawSwimRecord, SwimRecordIndex } from '../types/RawSwimRecord';
import staticData from '../fixtures/swimData.json';

export class StaticSwimDataGateway implements ISwimDataGateway {
  private data: RawSwimRecord[] = staticData as RawSwimRecord[];

  async fetchRecords(filter?: SwimDataFilter): Promise<RawSwimRecord[]> {
    let results = [...this.data];

    if (filter?.swimmerName) {
      const nameRegex = new RegExp(filter.swimmerName, 'i');
      results = results.filter(r =>
        nameRegex.test(r[SwimRecordIndex.DISPLAY_NAME])
      );
    }

    if (filter?.team) {
      results = results.filter(r => r[SwimRecordIndex.TEAM] === filter.team);
    }

    if (filter?.event) {
      results = results.filter(r => r[SwimRecordIndex.EVENT] === filter.event);
    }

    if (filter?.year) {
      results = results.filter(r =>
        r[SwimRecordIndex.DATE].startsWith(filter.year)
      );
    }

    if (filter?.limit) {
      results = results.slice(0, filter.limit);
    }

    return results;
  }

  async getLatestDate(): Promise<string> {
    return this.data.reduce((latest, record) => {
      const date = record[SwimRecordIndex.DATE];
      return date > latest ? date : latest;
    }, '0');
  }

  async getSwimmerNames(): Promise<string[]> {
    const names = this.data.map(r => r[SwimRecordIndex.DISPLAY_NAME]);
    return Array.from(new Set(names)).sort();
  }
}
```

### 2.3: Create Vercel API Routes

Create `api/swim-records.ts`:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const {
      swimmerName,
      team,
      event,
      year,
      limit = '10000'
    } = req.query;

    let query = supabase.from('swim_records').select('*');

    // Apply filters
    if (swimmerName) {
      query = query.ilike('display_name', `%${swimmerName}%`);
    }
    if (team) {
      query = query.eq('team', team);
    }
    if (event) {
      query = query.eq('event', parseInt(event as string));
    }
    if (year) {
      query = query.gte('date', `${year}-01-01`)
                   .lte('date', `${year}-12-31`);
    }

    // Apply limit and ordering
    query = query
      .order('event', { ascending: true })
      .order('converted_time', { ascending: true })
      .limit(parseInt(limit as string));

    const { data, error } = await query;

    if (error) throw error;

    // Transform to RawSwimRecord array format
    const records = data?.map(record => [
      record.age,
      record.converted_time,
      record.date,
      record.display_name,
      record.event,
      record.place,
      record.team,
      record.week_number
    ]) || [];

    res.status(200).json({
      success: true,
      count: records.length,
      records
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
```

Create `api/swimmer-names.ts`:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { data, error } = await supabase
      .from('swim_records')
      .select('display_name')
      .order('display_name');

    if (error) throw error;

    // Get unique names
    const uniqueNames = Array.from(
      new Set(data?.map(r => r.display_name) || [])
    ).sort();

    res.status(200).json({
      success: true,
      count: uniqueNames.length,
      names: uniqueNames
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
```

Create `api/latest-date.ts`:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { data, error } = await supabase
      .from('swim_records')
      .select('date')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      latestDate: data?.date || null
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
```

### 2.4: Create API-Based Gateway Implementation

Create `src/gateways/ApiSwimDataGateway.ts`:
```typescript
import { ISwimDataGateway, SwimDataFilter } from './ISwimDataGateway';
import { RawSwimRecord } from '../types/RawSwimRecord';

export class ApiSwimDataGateway implements ISwimDataGateway {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async fetchRecords(filter?: SwimDataFilter): Promise<RawSwimRecord[]> {
    const params = new URLSearchParams();

    if (filter?.swimmerName) params.append('swimmerName', filter.swimmerName);
    if (filter?.team) params.append('team', filter.team);
    if (filter?.event) params.append('event', filter.event.toString());
    if (filter?.year) params.append('year', filter.year);
    if (filter?.limit) params.append('limit', filter.limit.toString());

    const url = `${this.baseUrl}/api/swim-records?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.records as RawSwimRecord[];
  }

  async getLatestDate(): Promise<string> {
    const url = `${this.baseUrl}/api/latest-date`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.latestDate;
  }

  async getSwimmerNames(): Promise<string[]> {
    const url = `${this.baseUrl}/api/swimmer-names`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.names;
  }
}
```

### 2.5: Create Gateway Factory (Dependency Injection)

Create `src/gateways/SwimDataGatewayFactory.ts`:
```typescript
import { ISwimDataGateway } from './ISwimDataGateway';
import { ApiSwimDataGateway } from './ApiSwimDataGateway';
import { StaticSwimDataGateway } from './StaticSwimDataGateway';

export type GatewayType = 'static' | 'api';

export class SwimDataGatewayFactory {
  static create(type: GatewayType, apiBaseUrl?: string): ISwimDataGateway {
    switch (type) {
      case 'api':
        return new ApiSwimDataGateway(apiBaseUrl);
      case 'static':
      default:
        return new StaticSwimDataGateway();
    }
  }
}
```

### 2.6: Test API Endpoints

```bash
# Commit API code
git add api/ src/gateways/
git commit -m "API: Add Vercel API routes and gateway implementations"
git push

# Wait for deployment, then test endpoints
# Replace YOUR-VERCEL-URL with your actual preview URL
```

Test in browser or with curl:
```bash
# Test swim records API
curl https://YOUR-VERCEL-URL/api/swim-records?limit=5

# Test swimmer names API
curl https://YOUR-VERCEL-URL/api/swimmer-names

# Test latest date API
curl https://YOUR-VERCEL-URL/api/latest-date
```

### 2.7: Create Data Migration Script

Create `scripts/migrateToSupabase.js`:
```javascript
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Use service role for admin operations
);

async function migrateData() {
  try {
    console.log('Starting migration...');

    // Read existing JSON data
    const rawData = require('../src/fixtures/swimData.json');
    console.log(`Found ${rawData.length} records to migrate`);

    // Transform to match database schema
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
      console.warn('Note: Could not clear existing data:', deleteError.message);
    }

    // Insert in batches (Supabase limit is 1000 per batch)
    const batchSize = 1000;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(records.length / batchSize);

      console.log(`Processing batch ${batchNum}/${totalBatches} (${batch.length} records)...`);

      const { data, error } = await supabase
        .from('swim_records')
        .insert(batch)
        .select('id');

      if (error) {
        console.error(`Error in batch ${batchNum}:`, error.message);
        errorCount += batch.length;
      } else {
        successCount += data.length;
        console.log(`✓ Batch ${batchNum} completed (${data.length} records inserted)`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n=== Migration Complete ===');
    console.log(`Total records: ${records.length}`);
    console.log(`Successfully migrated: ${successCount}`);
    console.log(`Errors: ${errorCount}`);

    // Verify data
    console.log('\nVerifying migration...');
    const { count, error: countError } = await supabase
      .from('swim_records')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error verifying count:', countError.message);
    } else {
      console.log(`Database now contains: ${count} records`);
    }

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
```

Add to `package.json`:
```json
{
  "scripts": {
    "migrate": "node scripts/migrateToSupabase.js"
  }
}
```

### 2.8: Run Data Migration

```bash
# Ensure .env.local is configured with SUPABASE_SERVICE_ROLE_KEY
npm run migrate
```

**Verify migration**:
```sql
-- In Supabase SQL Editor
SELECT COUNT(*) FROM swim_records;

SELECT MIN(date), MAX(date) FROM swim_records;

SELECT team, COUNT(*) FROM swim_records GROUP BY team ORDER BY team;

SELECT event, COUNT(*) FROM swim_records GROUP BY event ORDER BY event;
```

### 2.9: Commit Migration Tools

```bash
git add scripts/ package.json
git commit -m "Migration: Add Supabase data migration script"
git push
```

**Step 2 Deliverables**:
- ✅ Clean architecture gateways (interface + implementations)
- ✅ Working API endpoints on Vercel
- ✅ All swim data migrated to Supabase
- ✅ Migration script for future use
- ✅ Frontend still using static data (not yet switched)

---

## Step 3: Switch Frontend to API

**Goal**: Update frontend to use API gateway while maintaining clean architecture

**Time Estimate**: 3-4 hours

### 3.1: Add Configuration Management

Create `src/config/environment.ts`:
```typescript
export interface EnvironmentConfig {
  gatewayType: 'static' | 'api';
  apiBaseUrl?: string;
}

function getConfig(): EnvironmentConfig {
  // Check for build-time environment variable
  const useApi = process.env.REACT_APP_USE_API === 'true';

  return {
    gatewayType: useApi ? 'api' : 'static',
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || ''
  };
}

export const config = getConfig();
```

### 3.2: Update Data Loading in Presenter

Modify `src/fixtures/swimData.ts`:
```typescript
import { RawSwimRecord, SwimRecordIndex } from '../types/RawSwimRecord';
import { SwimDataGatewayFactory } from '../gateways/SwimDataGatewayFactory';
import { config } from '../config/environment';

const gateway = SwimDataGatewayFactory.create(
  config.gatewayType,
  config.apiBaseUrl
);

export async function getLatestSwimRecordAndNamesAndData() {
  // Fetch all data using the configured gateway
  const rawData = await gateway.fetchRecords();
  const latestSwimRecordDate = await gateway.getLatestDate();
  const swimmerNames = await gateway.getSwimmerNames();

  return {
    latestSwimRecordDate,
    rawData,
    swimmerNames,
  };
}

export function findMostRecentDate(swimData: RawSwimRecord[]): string {
  const latestSwimRecord = swimData.reduce((acc: string, record: RawSwimRecord): string => {
    return String(record[SwimRecordIndex.DATE]).localeCompare(acc) > 0
      ? record[SwimRecordIndex.DATE]
      : acc;
  }, '0');
  return latestSwimRecord;
}
```

### 3.3: Update Presenter to Load Data Asynchronously

Modify `src/presenter/actions/index.ts` to add initialization action:
```typescript
import { Context } from '../presenter';

export const initializeApp = async ({ state, effects }: Context) => {
  try {
    state.currentPage = 'Loading';

    // Load data from gateway
    const { latestSwimRecordDate, rawData, swimmerNames } =
      await effects.swimData.getLatestSwimRecordAndNamesAndData();

    state.latestSwimRecordDate = latestSwimRecordDate;
    state.rawSwimData = rawData;
    state.swimmerNames = swimmerNames;

    // Show search page
    state.currentPage = 'SearchResults';
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Could add error state handling here
  }
};
```

Update `src/presenter/effects/index.ts`:
```typescript
import * as swimData from '../../fixtures/swimData';

export const effects = {
  swimData,
};
```

### 3.4: Update App Component for Async Initialization

Modify `src/App.tsx`:
```typescript
import './types/images.d.ts';
import { CurrentPage } from './components/CurrentPage';
import { Provider } from 'overmind-react';
import { overmindApp } from './presenter/presenter';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './MadisonSwimming-Logo-Small.webp';
import { LoadingTemplate } from './views/LoadingTemplate';

import './styles.css';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app and load data
    overmindApp.actions.initializeApp()
      .then(() => setIsInitialized(true))
      .catch(error => {
        console.error('App initialization failed:', error);
        // Still show UI, but with error state
        setIsInitialized(true);
      });
  }, []);

  if (!isInitialized) {
    return <LoadingTemplate />;
  }

  return (
    <Provider value={overmindApp}>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <img
            className="mx-auto h-16 inline w-auto"
            src={logo}
            alt="Madison Swimming Logo"
          />
          <hr className="my-4" />
          <CurrentPage />
        </div>
      </main>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  window.document.querySelector('#app'),
);
```

### 3.5: Configure Environment Variables

**For Vercel** (Project Settings → Environment Variables):
```
REACT_APP_USE_API=false
REACT_APP_API_BASE_URL=https://your-project.vercel.app
```

**For Local Development** (`.env.local`):
```
REACT_APP_USE_API=false
REACT_APP_API_BASE_URL=http://localhost:3000
```

### 3.6: Test with Static Gateway (No Change)

```bash
# Commit changes
git add src/
git commit -m "Frontend: Add async initialization with gateway abstraction"
git push

# Test on Vercel (should work exactly as before)
```

**Verify**:
- [ ] Site loads correctly
- [ ] All filters work
- [ ] Data displays correctly
- [ ] Export works
- [ ] Still using bundled static data

### 3.7: Test with API Gateway (Development)

Update `.env.local`:
```
REACT_APP_USE_API=true
REACT_APP_API_BASE_URL=https://your-project.vercel.app
```

Test locally:
```bash
npm start
```

**Verify**:
- [ ] Site loads (may be slower on first load)
- [ ] Data comes from API (check Network tab)
- [ ] All filters work
- [ ] Search functionality works
- [ ] Export works

### 3.8: Deploy with API Enabled

In Vercel dashboard, update environment variable:
```
REACT_APP_USE_API=true
```

Redeploy (or trigger via push):
```bash
git commit --allow-empty -m "Deploy: Enable API gateway"
git push
```

**Monitor deployment**:
- Check Vercel deployment logs
- Test all functionality on preview URL
- Monitor Vercel Functions logs for errors
- Check Supabase logs for query performance

### 3.9: Performance & Error Handling

Add error boundaries and loading states as needed.

Create `src/components/ErrorBoundary.tsx`:
```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
          <p className="mb-4">We're having trouble loading the swim records.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Wrap App in ErrorBoundary:
```typescript
// In App.tsx
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  window.document.querySelector('#app'),
);
```

### 3.10: Documentation & Testing

Create `DEPLOYMENT.md`:
```markdown
# Deployment Guide

## Current Architecture
- **Frontend**: React app deployed to Vercel
- **API**: Vercel serverless functions (in /api directory)
- **Database**: Supabase PostgreSQL

## Branch Strategy
- `main`: Production (GitHub Pages) - legacy
- `feature/vercel-supabase-migration`: Vercel deployment

## Environment Variables
Required in Vercel:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Public anon key from Supabase
- `REACT_APP_USE_API`: "true" to use API, "false" for static
- `REACT_APP_API_BASE_URL`: Your Vercel deployment URL

## How to Update Swim Data
1. Prepare CSV file with new season data
2. Run migration script: `npm run migrate`
3. Verify data in Supabase dashboard
4. Data appears immediately (no redeploy needed)

## Rollback Procedure
If issues arise:
1. In Vercel, change `REACT_APP_USE_API` to "false"
2. Redeploy (or wait for auto-redeploy)
3. Site reverts to bundled static data
```

**Full Testing Checklist**:
- [ ] Search by swimmer name
- [ ] Filter by team
- [ ] Filter by distance
- [ ] Filter by stroke
- [ ] Filter by gender
- [ ] Filter by age group
- [ ] Filter by season/year
- [ ] Best times per event checkbox
- [ ] Best times per swimmer checkbox
- [ ] Export to CSV
- [ ] Verify correct record count
- [ ] Test on mobile device
- [ ] Test with slow 3G (throttling)
- [ ] Verify cold start performance

### 3.11: Final Commit & Documentation

```bash
git add .
git commit -m "Complete: Frontend using API gateway with clean architecture"
git push
```

**Step 3 Deliverables**:
- ✅ Frontend using API gateway
- ✅ Clean architecture maintained (easy to swap implementations)
- ✅ Error handling and loading states
- ✅ Documentation for future maintainers
- ✅ All functionality working via API
- ✅ Ready for merge to main (when you're ready)

---

## Post-Migration: Merge to Production

**When you're confident** (after days/weeks of testing):

### Option A: Make Vercel the New Production
1. Update Vercel to deploy from `main` branch
2. Merge feature branch to main:
   ```bash
   git checkout main
   git merge feature/vercel-supabase-migration
   git push
   ```
3. Update DNS to point to Vercel (if using custom domain)
4. Keep GitHub Pages as fallback

### Option B: Keep Both Running
- `main` → GitHub Pages (legacy, static)
- Vercel → API-powered version (new)
- Share Vercel URL with users
- Gradually migrate users

---

## Summary

| Step | Focus | Time | Key Deliverable |
|------|-------|------|----------------|
| 1 | Infrastructure | 3-4h | Vercel + Supabase setup, test data |
| 2 | Backend | 4-5h | API + gateways + full data migration |
| 3 | Frontend | 3-4h | Switch to API with clean architecture |

**Total**: 10-13 hours

**Key Principles Maintained**:
- ✅ Clean architecture (gateway pattern)
- ✅ Interface/implementation separation
- ✅ Feature branch development
- ✅ Zero production impact until merge
- ✅ Easy rollback at every stage

**Next Action**: Begin Step 1 🚀
