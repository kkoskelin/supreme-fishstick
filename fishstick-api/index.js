module.exports.handler = async event => {
  return {
    body: JSON.stringify(
      {
        input: event,
        message: 'Go Serverless v3.0! Your function executed successfully!',
      },
      null,
      2,
    ),
    statusCode: 200,
  };
};
