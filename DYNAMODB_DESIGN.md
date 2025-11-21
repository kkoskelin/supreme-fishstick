# DynamoDB Table Design for Swim Records

## Overview

This document describes the DynamoDB table design for the Supreme Fishstick swim records application. The design is optimized for the query patterns identified in the `derivedState.ts` functions and supports efficient data retrieval for the application's filtering and search capabilities.

## Data Model

The table uses a single-table design with a composite primary key and three Global Secondary Indexes (GSIs) to support various access patterns.

### Base Table

- **Table Name**: `supreme-fishstick-api-swim-records-{stage}`
- **Billing Mode**: PAY_PER_REQUEST (on-demand)
- **Primary Key**:
  - **PK** (Partition Key): `RECORD#<uuid>` - Unique identifier for each swim record
  - **SK** (Sort Key): `DATE#<date>#EVENT#<eventNumber>` - Composite key for sorting by date and event

### Attributes

Based on the `SwimRecord` and `RawSwimRecord` types:

```typescript
{
  // Keys
  PK: string,              // "RECORD#<uuid>"
  SK: string,              // "DATE#2024-06-08#EVENT#14"
  
  // GSI Keys
  GSI1PK: string,          // "SWIMMER#<displayName>"
  GSI1SK: string,          // "DATE#<date>#EVENT#<eventId>"
  GSI2PK: string,          // "TEAM#<teamCode>"
  GSI2SK: string,          // "DATE#<date>#SWIMMER#<displayName>"
  GSI3PK: string,          // "EVENT#<eventNumber>"
  GSI3SK: number,          // <convertedTime> (for sorting)
  
  // Record Data
  age: number,
  convertedTime: number,
  date: string,            // ISO date: "2024-06-08"
  displayName: string,     // "Gehrig, Lou"
  event: number,           // Event number (11-68)
  exhibition: boolean,
  place?: number,
  team: string,            // Team code: "G" (Spring Green)
  weekNumber: number,
  
  // Event Details (denormalized for efficient querying)
  gender: string,          // "Girls" | "Boys"
  ageClass: string,        // "8 & U" | "9-10" | "11-12" | "13-14" | "15-18"
  distance: string,        // "25M" | "50M" | "100M" | "200M"
  stroke: string,          // "Free" | "Back" | "Breast" | "Fly" | "IM"
  
  // Computed Fields
  year: string,            // "2024" (extracted from date)
  
  // Metadata
  createdAt: string,
  updatedAt: string
}
```

## Access Patterns and Queries

### 1. Get All Records (with optional date range)

**Pattern**: Retrieve all swim records, optionally filtered by date range

**Query Type**: Scan or Query on base table

**Implementation**:
```javascript
// Query by date range using SK
{
  KeyConditionExpression: "PK = :pk AND SK BETWEEN :startDate AND :endDate",
  ExpressionAttributeValues: {
    ":pk": "RECORD#",
    ":startDate": "DATE#2024-01-01",
    ":endDate": "DATE#2024-12-31"
  }
}
```

### 2. Query by Swimmer Name

**Pattern**: Find all records for a specific swimmer (supports `rawNameFilter`)

**Index**: GSI1

**Keys**:
- **GSI1PK**: `SWIMMER#<displayName>` (e.g., "SWIMMER#Gehrig, Lou")
- **GSI1SK**: `DATE#<date>#EVENT#<eventId>` (for sorting by date and event)

**Query**:
```javascript
{
  IndexName: "GSI1",
  KeyConditionExpression: "GSI1PK = :swimmerPK",
  ExpressionAttributeValues: {
    ":swimmerPK": "SWIMMER#Gehrig, Lou"
  }
}
```

**For Substring Matching**: Use Scan with FilterExpression for partial name matches:
```javascript
{
  IndexName: "GSI1",
  FilterExpression: "contains(displayName, :nameSubstring)",
  ExpressionAttributeValues: {
    ":nameSubstring": "Gehrig"
  }
}
```

### 3. Query by Team

**Pattern**: Find all records for a specific team (supports `rawTeamFilter`)

**Index**: GSI2

**Keys**:
- **GSI2PK**: `TEAM#<teamCode>` (e.g., "TEAM#G" for Spring Green)
- **GSI2SK**: `DATE#<date>#SWIMMER#<displayName>` (for sorting by date and swimmer)

**Query**:
```javascript
{
  IndexName: "GSI2",
  KeyConditionExpression: "GSI2PK = :teamPK",
  ExpressionAttributeValues: {
    ":teamPK": "TEAM#G"
  }
}
```

### 4. Query by Event (Rankings and Best Times)

**Pattern**: Find all records for a specific event, sorted by time (supports event filtering and best times)

**Index**: GSI3

**Keys**:
- **GSI3PK**: `EVENT#<eventNumber>` (e.g., "EVENT#14" for Boys 9-10 50M Free)
- **GSI3SK**: `<convertedTime>` (numeric, automatically sorted ascending)

**Query for Rankings**:
```javascript
{
  IndexName: "GSI3",
  KeyConditionExpression: "GSI3PK = :eventPK",
  ExpressionAttributeValues: {
    ":eventPK": "EVENT#14"
  },
  Limit: 10 // Top 10 times
}
```

**Query for Best Time per Swimmer**:
```javascript
// Query GSI3 and deduplicate by displayName in application logic
{
  IndexName: "GSI3",
  KeyConditionExpression: "GSI3PK = :eventPK",
  ExpressionAttributeValues: {
    ":eventPK": "EVENT#14"
  }
}
// Then filter in application to keep only best time per swimmer
```

### 5. Combined Filters

**Pattern**: Apply multiple filters (gender, stroke, distance, ageClass, year)

**Implementation**: Use FilterExpression with any of the above queries

**Example - Event records filtered by year**:
```javascript
{
  IndexName: "GSI3",
  KeyConditionExpression: "GSI3PK = :eventPK",
  FilterExpression: "#year = :year",
  ExpressionAttributeNames: {
    "#year": "year"
  },
  ExpressionAttributeValues: {
    ":eventPK": "EVENT#14",
    ":year": "2024"
  }
}
```

**Example - Multiple attribute filters**:
```javascript
{
  FilterExpression: "#gender = :gender AND #stroke = :stroke AND #distance = :distance AND #year = :year",
  ExpressionAttributeNames: {
    "#gender": "gender",
    "#stroke": "stroke",
    "#distance": "distance",
    "#year": "year"
  },
  ExpressionAttributeValues: {
    ":gender": "Boys",
    ":stroke": "Free",
    ":distance": "50M",
    ":year": "2024"
  }
}
```

## Query Pattern Mapping

The following table maps the application's filter functions to DynamoDB query strategies:

| Filter Function | DynamoDB Strategy | Notes |
|----------------|-------------------|-------|
| `rawNameFilter` | GSI1 Query + FilterExpression | Use `contains()` for substring match |
| `rawTeamFilter` | GSI2 Query | Direct match on team code |
| `rawStrokeFilter` | Scan + FilterExpression | Filter on denormalized `stroke` attribute |
| `rawGenderFilter` | Scan + FilterExpression | Filter on denormalized `gender` attribute |
| `rawDistanceFilter` | Scan + FilterExpression | Filter on denormalized `distance` attribute |
| `rawAgeClassFilter` | Scan + FilterExpression | Filter on denormalized `ageClass` attribute |
| `rawYearFilter` | SK begins_with or FilterExpression | Filter on `year` attribute or SK prefix |
| `getBestTimesPerEvent` | GSI3 Query | Sort by GSI3SK (convertedTime), deduplicate in app |
| Multiple filters | Any query + FilterExpression | Combine multiple FilterExpression conditions |

## Data Denormalization

To optimize query performance and reduce the need for joins, the following data is denormalized in each record:

1. **Event Details**: Gender, age class, distance, and stroke from the EVENT_MAP are stored with each record
2. **Year**: Extracted from the date field for easier filtering
3. **Team Name**: Can optionally store the full team name alongside team code

This denormalization allows for efficient filtering without requiring lookups to separate tables.

## Example Record

```json
{
  "PK": "RECORD#550e8400-e29b-41d4-a716-446655440000",
  "SK": "DATE#2024-06-08#EVENT#14",
  "GSI1PK": "SWIMMER#Gehrig, Lou",
  "GSI1SK": "DATE#2024-06-08#EVENT#14",
  "GSI2PK": "TEAM#G",
  "GSI2SK": "DATE#2024-06-08#SWIMMER#Gehrig, Lou",
  "GSI3PK": "EVENT#14",
  "GSI3SK": 32.12,
  "age": 10,
  "convertedTime": 32.12,
  "date": "2024-06-08",
  "displayName": "Gehrig, Lou",
  "event": 14,
  "exhibition": false,
  "place": 1,
  "team": "G",
  "weekNumber": 1,
  "gender": "Boys",
  "ageClass": "9-10",
  "distance": "50M",
  "stroke": "Free",
  "year": "2024",
  "createdAt": "2024-06-08T12:00:00Z",
  "updatedAt": "2024-06-08T12:00:00Z"
}
```

## Cost Considerations

- **PAY_PER_REQUEST** billing mode is used to avoid paying for unused capacity during low-traffic periods
- **GSIs** project all attributes (ProjectionType: ALL) to avoid additional read costs
- For high-volume production use, consider switching to PROVISIONED billing with auto-scaling

## Migration Strategy

To populate this table from existing `swimData.json`:

1. Read the `swimData.json` file
2. For each record:
   - Generate a UUID for PK
   - Construct SK from date and event
   - Construct GSI keys using the patterns above
   - Lookup event details from EVENT_MAP and denormalize
   - Write to DynamoDB using BatchWriteItem (up to 25 items at a time)

## Future Enhancements

1. **Add GSI4** for querying by year+event for efficient year-based rankings
2. **DynamoDB Streams** are enabled for:
   - Real-time analytics
   - Triggering notifications for new records
   - Maintaining derived tables or search indexes (e.g., Elasticsearch)
3. **TTL attribute** if records should expire after a certain time
4. **Point-in-Time Recovery** for production environments

## Deployment

Deploy the DynamoDB table using Serverless Framework:

```bash
# Deploy to development
npx serverless deploy --stage dev

# Deploy to production
npx serverless deploy --stage prod

# Remove stack
npx serverless remove --stage dev
```

## Related Files

- `serverless.yml` - Infrastructure as Code definition
- `src/types/SwimRecord.ts` - TypeScript type definition for swim records
- `src/types/RawSwimRecord.ts` - Raw data format from CSV
- `src/presenter/derivedState.ts` - Query filter functions and patterns
- `src/data/events.ts` - Event mapping and categorization
