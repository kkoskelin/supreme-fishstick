/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';

const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });
export const dynamoDb = {
  addEvent: async () => {
    const eventRecord = {
      age: 25,
      convertedTime: 65.45,
      entityType: 'EventRecord',
      eventDate: '2023-09-15',
      eventId: 1,
      exhibition: false,
      place: '1st',
      swimmerId: 'swimmer123',
      time: 25.72,
      weekNumber: 2,
    };
    const params = {
      Item: {
        age: { N: eventRecord.age.toString() },
        convertedTime: { N: eventRecord.convertedTime.toString() },
        entityType: { S: eventRecord.entityType },
        eventDate: { S: eventRecord.eventDate },
        eventId: { N: eventRecord.eventId.toString() },
        exhibition: { BOOL: eventRecord.exhibition },
        place: { S: eventRecord.place },
        swimmerId: { S: eventRecord.swimmerId },
        time: { N: eventRecord.time.toString() },
        weekNumber: { N: eventRecord.weekNumber.toString() },
      },
      TableName: process.env.SWIM_RECORDS_DB,
    };
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
  },
  addSwimmer: async () => {
    // Define the Swimmer example
    const swimmer = {
      displayName: 'John Doe',
      entityType: 'Swimmer',
      firstName: 'John',
      lastName: 'Doe',
      swimmerId: 'swimmer123',
      team: 'TeamA',
    };
    // Define the parameters for the PutItem command
    const params = {
      // Retrieve the table name from environment variables
      Item: {
        displayName: { S: swimmer.displayName },
        entityType: { S: swimmer.entityType },
        firstName: { S: swimmer.firstName },
        lastName: { S: swimmer.lastName },
        swimmerId: { S: swimmer.swimmerId },
        team: { S: swimmer.team },
      },
      TableName: process.env.SWIM_RECORDS_DB,
    };
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
  },
  getEventsBySwimmerId: async (swimmerId: string) => {
    // Define the DynamoDB query parameters
    const params = {
      // Add condition for entityType
      ExpressionAttributeValues: {
        ':e': { S: 'EventRecord' },
        ':s': { S: swimmerId }, // Specify the entityType you want to retrieve
      },
      // Retrieve the table name from environment variables
      KeyConditionExpression: 'swimmerId = :s AND entityType = :e',
      TableName: process.env.SWIM_RECORDS_DB,
    };

    // Execute the DynamoDB query
    const command = new QueryCommand(params);
    const result = await dynamoDBClient.send(command);

    // // Extract the EventRecords from the query result
    const eventRecords = result.Items || [];
    return eventRecords;
  },
  getEventsBySwimmerIdAndEventId: async (
    swimmerId: string,
    eventId: number,
  ) => {
    const params = {
      ExpressionAttributeValues: {
        ':e': { N: eventId.toString() },
        ':s': { S: swimmerId },
        ':t': { S: 'EventRecord' }, // Specify the entityType as 'EventRecord'
      },
      // Retrieve the table name from environment variables
      KeyConditionExpression:
        'eventId = :e AND swimmerId = :s AND entityType = :t',
      TableName: process.env.SWIM_RECORDS_DB,
    };

    // Execute the DynamoDB query
    const command = new QueryCommand(params);
    const result = await dynamoDBClient.send(command);

    // // Extract the EventRecords from the query result
    const eventRecords = result.Items || [];
    return eventRecords;
  },
  getSwimmerBySwimmerId: async (swimmerId: string) => {
    const params = {
      // Retrieve the table name from environment variables
      Key: {
        entityType: { S: 'Swimmer' },
        swimmerId: { S: swimmerId }, // Specify the entityType as 'Swimmer'
      },
      TableName: process.env.SWIM_RECORDS_DB,
    };

    try {
      // Retrieve the Swimmer from the DynamoDB table
      const command = new GetItemCommand(params);
      const result = await dynamoDBClient.send(command);

      // Check if the item exists
      if (result.Item) {
        const swimmer = {
          displayName: result.Item.displayName.S,
          firstName: result.Item.firstName.S,
          lastName: result.Item.lastName.S,
          swimmerId: result.Item.swimmerId.S,
          team: result.Item.team.S,
        };
        // console.log('Swimmer retrieved successfully:', swimmer);
        return swimmer;
      } else {
        // console.log('Swimmer not found.');
        return undefined;
      }
    } catch (error) {
      console.error('Error retrieving Swimmer:', error);
      throw error;
    }
  },
};
