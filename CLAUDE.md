# Project Overview: Tri-County Swim League Records

## Purpose
A searchable, filterable swim records application for the Tri-County Swim League in the Madison, Wisconsin area. The application allows coaches, swimmers, and families to search swimmer performance data across multiple seasons and filter by various criteria (swimmer name, event, team, age group, etc.).

## Tech Stack

### Frontend Application
- **React 18** with TypeScript
- **Overmind** for state management (a lightweight alternative to Redux)
- **Parcel** as the build tool/bundler
- **TailwindCSS** for styling
- **react-data-table-component** for data display with sorting/export
- **page.js** and **react-router-dom** for routing

### Development Tools
- TypeScript with strict typing
- ESLint + Prettier for code quality
- Jest for testing
- Husky + lint-staged for pre-commit hooks
- Volta for Node.js version management (Node 18)

### Deployment
- **GitHub Pages** via GitHub Actions (automatic deployment on push to main)
- Hosted at: https://kkoskelin.github.io/supreme-fishstick/
- Can also be deployed as static site to other hosts (previously used tiiny.host)

## Data Pipeline

### CSV to JSON Conversion
The application uses a build-time data processing pipeline located in `src/fixtures/`:

**Input**: CSV files with swim meet results (e.g., `2025.csv`, `2024.csv`, `2023.csv`)

**Script**: `csvToJson.js` (Node.js script)
- Reads CSV files with columns: Place, Event #, Age, Date, Week, First Name, Last Name, Team, League, Converted Time
- Maps team names to single-letter codes (B=Baraboo, C=Cross Plains, M=Mazomanie, H=Mt. Horeb, K=Sauk Prairie, G=Spring Green, P=Sun Prairie, W=Wis. Dells)
- Converts swim times (MM:SS or SS.SS format) to decimal seconds
- Transforms records into compact array format to reduce bundle size
- Sorts records by event number, then by time (fastest first)
- Outputs to `swimData.json`

**Usage**:
```bash
cd src/fixtures
node csvToJson.js 2021.csv 2022.csv 2023.csv 2024.csv 2025.csv
```

### Data Structure

**RawSwimRecord** (compact array format):
```typescript
[
  age: number,           // swimmer's age at time of swim
  convertedTime: number, // time in seconds (e.g., 35.47)
  date: string,          // ISO format (YYYY-MM-DD)
  displayName: string,   // "Last Name, First Name"
  event: number,         // event number (11-68)
  place: number,         // finishing place (0 = exhibition)
  team: string,          // single-letter team code
  weekNumber: number     // week of season (1-8 typically)
]
```

**Event Mapping** (`src/data/events.ts`):
- Events numbered 11-68
- Each event maps to: gender (Boys/Girls), age class (8&U, 9-10, 11-12, 13-14, 15-18), distance (25M, 50M, 100M, 200M), stroke (Free, Back, Breast, Fly, IM)
- Example: Event 15 = "Girls 11-12 50M Free"

## Application Architecture

### State Management (Overmind)
**State** (`src/presenter/state.ts`):
- `currentPage`: 'Loading' | 'SearchResults'
- `form.recordFilter`: current filter selections
- `rawSwimData`: array of RawSwimRecord tuples
- `swimmerNames`: sorted list for autocomplete
- `swimSeasonYears`: available years (2019, 2021-2025, no 2020 due to COVID)
- `latestSwimRecordDate`: most recent swim date in dataset

**Derived State** (`src/presenter/derivedState.ts`):
- `filteredSwimRecords`: applies filters to raw data and transforms to display format
- `hasSearchParameters`: checks if any filters are active

**Actions** (`src/presenter/actions/`):
- `updateFilter`: updates filter criteria
- `submitSearch`: executes search and displays results
- `clearSearch`: resets all filters
- `displayLoading`: shows loading state

### Components

**SwimmerFilter** (`src/components/SwimmerFilter.tsx`):
- Main search form with filter controls
- Inputs: swimmer name (with autocomplete), distance, stroke, gender, age group, season, team
- Checkboxes: "Show each swimmer's best event times only" or "Show only best time for each event"
- Displays record count and latest date

**Datatable** (`src/components/Datatable.tsx`):
- Displays filtered results in sortable table
- Columns: Name, Age, Team, Event, Time, Place, Date
- Supports export to CSV

**CurrentPage** (`src/components/CurrentPage.tsx`):
- Router component that renders either SwimmerFilter or LoadingTemplate

### Data Loading
- `src/fixtures/swimData.ts` imports `swimData.json` and provides helper functions
- `getLatestSwimRecordAndNamesAndData()` extracts swimmer names and latest date
- Data is loaded at build time (static import), not at runtime

## Key Features

1. **Search by Swimmer Name**: Autocomplete input with all swimmer names
2. **Multi-criteria Filtering**: Distance, stroke, gender, age group, season, team
3. **Best Times Options**:
   - Best time per swimmer per event (shows each swimmer's personal record for each event)
   - Best time per event (shows the fastest time for each event, regardless of swimmer)
4. **Sortable Results**: Click column headers to sort
5. **Export**: Download results as CSV
6. **Responsive Design**: Mobile-friendly with Tailwind CSS

## Data Coverage
- **Years**: 2019, 2021, 2022, 2023, 2024, 2025 (no 2020 data due to COVID-19 pandemic)
- **Teams**: 8 teams in the Tri-County league
- **Events**: 58 different events (combinations of age/gender/distance/stroke)
- **Records**: Thousands of individual swim times

## Build and Deployment Process

1. **Prepare Data**:
   ```bash
   # Clean and prepare CSV from Google Sheets download
   mv ~/Downloads/2025\ Tri\ County\ Swim\ Results\ -\ Tri-County.csv ./src/fixtures/2025.csv
   tail -n +2 ./src/fixtures/2025.csv | sed -e 's/,Tri/\/2025,Tri/g' > temp.csv
   mv temp.csv ./src/fixtures/2025.csv

   # Convert to JSON
   cd src/fixtures
   node csvToJson.js 2019.csv 2021.csv 2022.csv 2023.csv 2024.csv 2025.csv
   ```

2. **Build**:
   ```bash
   npm run clean
   npm run build:gh  # for GitHub Pages with correct public URL
   ```

3. **Deploy**:
   - Automatic: Push to `main` branch triggers GitHub Actions workflow (`.github/workflows/static.yml`)
   - Manual: Upload `dist/` folder to static hosting service

## Important Notes

- **Serverless references are unused**: Despite package.json containing serverless-related dependencies and scripts, the application is entirely static. The README's serverless section is outdated.
- **No backend/API**: All data is bundled at build time in `swimData.json`
- **Compact data format**: RawSwimRecord uses array format instead of objects to reduce bundle size
- **Memoization**: Frequently called formatting functions use lodash memoization for performance
- **Type safety**: Comprehensive TypeScript types for all data structures

## File Structure
```
src/
├── App.tsx                 # Root React component
├── index.html              # HTML entry point
├── components/             # React UI components
│   ├── SwimmerFilter.tsx   # Search form
│   ├── Datatable.tsx       # Results table
│   └── CurrentPage.tsx     # Router
├── presenter/              # State management (Overmind)
│   ├── state.ts            # Application state
│   ├── derivedState.ts     # Computed state and filters
│   ├── presenter.ts        # Overmind configuration
│   ├── actions/            # State mutations
│   └── effects/            # Side effects
├── types/                  # TypeScript type definitions
├── data/
│   ├── events.ts           # Event number to event details mapping
│   └── columns.ts          # Table column definitions
├── fixtures/
│   ├── csvToJson.js        # CSV→JSON conversion script
│   ├── swimData.ts         # Data loader
│   ├── swimData.json       # Generated: all swim records
│   └── *.csv               # Source CSV files by year
└── gateways/               # HTTP/API abstractions (minimal usage)
```

## Potential Future Enhancements
- Add individual swimmer profile pages
- Team standings/statistics
- Meet-by-meet results views
- Progressive record improvements over time
- Comparison tools between swimmers
- Mobile app using same data
