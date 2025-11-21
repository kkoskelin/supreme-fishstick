# Quick Reference: Serverless Setup

## What Was Implemented

This PR sets up the serverless infrastructure for the Supreme Fishstick swim records application.

### Files Added
1. **serverless.yml** - Main infrastructure configuration
2. **DYNAMODB_DESIGN.md** - Detailed database schema and query patterns  
3. **SERVERLESS.md** - Deployment guide and usage instructions

### DynamoDB Table Design

**Table Name**: `supreme-fishstick-api-swim-records-{stage}`

**Keys**:
- **PK**: `RECORD#<uuid>` (Partition Key)
- **SK**: `DATE#<date>#EVENT#<eventNumber>` (Sort Key)

**Global Secondary Indexes**:
1. **GSI1** - Swimmer Name Queries
   - PK: `SWIMMER#<displayName>`
   - SK: `DATE#<date>#EVENT#<eventId>`

2. **GSI2** - Team Queries  
   - PK: `TEAM#<teamCode>`
   - SK: `DATE#<date>#SWIMMER#<displayName>`

3. **GSI3** - Event Rankings (sorted by time)
   - PK: `EVENT#<eventNumber>`
   - SK: `<convertedTime>` (numeric)

### Query Pattern Mapping

| Application Filter | DynamoDB Strategy |
|-------------------|-------------------|
| `rawNameFilter` | GSI1 + FilterExpression for substring |
| `rawTeamFilter` | GSI2 Query |
| `rawStrokeFilter` | Scan/Query + FilterExpression on `stroke` |
| `rawGenderFilter` | Scan/Query + FilterExpression on `gender` |
| `rawDistanceFilter` | Scan/Query + FilterExpression on `distance` |
| `rawAgeClassFilter` | Scan/Query + FilterExpression on `ageClass` |
| `rawYearFilter` | FilterExpression on `year` |
| `getBestTimesPerEvent` | GSI3 Query (sorted by time) |

## How to Use

### Deploy Infrastructure
```bash
# Deploy to dev
npx serverless deploy --stage dev

# Deploy to prod  
npx serverless deploy --stage prod
```

### View Stack Info
```bash
npx serverless info --stage dev
```

### Remove Infrastructure
```bash
npx serverless remove --stage dev
```

### Validate Configuration
```bash
npx serverless print --stage dev
```

## Next Steps (Not Implemented)

To complete the serverless API, you would need to:

1. **Create Lambda handler functions** in an `api/handlers/` directory
2. **Implement CRUD operations** for swim records
3. **Add data migration script** to load swimData.json into DynamoDB
4. **Uncomment and configure API endpoints** in serverless.yml
5. **Add API Gateway configuration** for proper CORS and authentication
6. **Create helper utilities** for DynamoDB operations
7. **Add integration tests** for API endpoints

## Example Record Structure

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
  "year": "2024"
}
```

## Cost Estimate

For a typical small swim league:
- **DynamoDB**: < $2/month (assuming < 1M reads + minimal writes)
- **Lambda**: Free tier covers most usage
- **API Gateway**: Free tier covers most usage
- **Total**: Likely < $5/month

## Testing

All existing tests pass:
```bash
npm test
# Test Suites: 7 passed, 7 total
# Tests: 43 passed, 43 total
```

No application code was modified, only infrastructure configuration was added.

## Documentation

For more details, see:
- **DYNAMODB_DESIGN.md** - Complete schema design and access patterns
- **SERVERLESS.md** - Full deployment guide and troubleshooting
- **serverless.yml** - Infrastructure as Code configuration
