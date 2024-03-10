import { dynamoDb } from './dynamoDb';

export const applicationContext = {
  addSwimmerRecord: async () => {
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
    try {
      // Insert the EventRecord into the DynamoDB table
      const command = new PutItemCommand(params);
      await dynamoDBClient.send(command);

      console.log('EventRecord inserted successfully.');
    } catch (error) {
      console.error('Error inserting EventRecord:', error);
    }
  },
  getSwimmerRecords: async (swimmerId: string) => {
    const results = await dynamoDb.getRecordsBySwimmerId(swimmerId);
    return results;
  },
};

export type ApplicationContext = typeof applicationContext;
