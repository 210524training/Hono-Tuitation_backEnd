import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'eu-north-1',
  apiVersion: 'latest',
  accessKeyId: 'AKIA3Y7YBSXCG6DVT2MS',
  secretAccessKey: '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',
});

export default dynamo;
