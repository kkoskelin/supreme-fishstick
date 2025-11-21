# Serverless API Configuration

This directory contains the serverless configuration for the Supreme Fishstick swim records application.

## Overview

The serverless configuration sets up:
- AWS Lambda functions (placeholder for future API endpoints)
- DynamoDB table for storing swim records
- IAM roles and permissions
- CloudFormation stack for infrastructure management

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate credentials
2. **AWS CLI**: Install and configure AWS CLI with your credentials
3. **Serverless Framework**: Already included as a dev dependency

## Setup AWS Credentials

Follow the Serverless Framework AWS credentials guide:
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

Quick setup:
```bash
# Configure AWS credentials
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=<your-key-id>
export AWS_SECRET_ACCESS_KEY=<your-secret-key>
export AWS_REGION=us-east-1
```

## Deployment

### Deploy to Development
```bash
npx serverless deploy --stage dev
```

### Deploy to Production
```bash
npx serverless deploy --stage prod
```

### View Stack Information
```bash
npx serverless info --stage dev
```

### Remove Stack (Delete All Resources)
```bash
npx serverless remove --stage dev
```

## DynamoDB Table

The configuration creates a DynamoDB table with the following characteristics:

- **Table Name**: `supreme-fishstick-api-swim-records-{stage}`
- **Billing Mode**: PAY_PER_REQUEST (on-demand pricing)
- **Primary Key**: Composite key (PK + SK)
- **Global Secondary Indexes**: 3 GSIs for different query patterns
  - GSI1: Query by swimmer name
  - GSI2: Query by team
  - GSI3: Query by event (for rankings and best times)

See [DYNAMODB_DESIGN.md](./DYNAMODB_DESIGN.md) for detailed table design and query patterns.

## API Endpoints (Future)

The serverless.yml includes commented placeholders for API endpoints that can be implemented:

- `GET /records` - Get all swim records with optional filters
- `GET /records/swimmer/{swimmerId}` - Get records for a specific swimmer
- Additional endpoints can be added as needed

## Environment Variables

The Lambda functions have access to:
- `SWIM_RECORDS_TABLE` - Name of the DynamoDB table
- `STAGE` - Deployment stage (dev, prod, etc.)

## IAM Permissions

Lambda functions are granted the following DynamoDB permissions:
- Query
- Scan
- GetItem
- PutItem
- UpdateItem
- DeleteItem

Permissions are scoped to the swim records table and its indexes.

## Cost Estimation

**DynamoDB Costs** (on-demand pricing in us-east-1):
- Write: $1.25 per million write request units
- Read: $0.25 per million read request units
- Storage: $0.25 per GB-month

**Lambda Costs** (when implemented):
- Free tier: 1M requests and 400,000 GB-seconds per month
- After free tier: $0.20 per 1M requests + $0.0000166667 per GB-second

For a small swim league application, monthly costs should be minimal (likely under $5/month).

## Development Workflow

1. Make changes to `serverless.yml`
2. Validate configuration: `npx serverless print`
3. Deploy to dev: `npx serverless deploy --stage dev`
4. Test the changes
5. Deploy to prod: `npx serverless deploy --stage prod`

## Troubleshooting

### Deployment Fails
- Check AWS credentials are configured correctly
- Ensure you have permissions to create CloudFormation stacks
- Verify the region is correct

### DynamoDB Table Already Exists
- Use a different stage name
- Or remove the existing table first: `npx serverless remove --stage dev`

### Permission Errors
- Check IAM role permissions
- Verify the Lambda execution role has DynamoDB access

## Resources

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
- [AWS DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [DynamoDB Single Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/)

## Related Files

- `serverless.yml` - Infrastructure as Code configuration
- `DYNAMODB_DESIGN.md` - Detailed DynamoDB table design and access patterns
- `package.json` - Contains serverless deployment scripts
