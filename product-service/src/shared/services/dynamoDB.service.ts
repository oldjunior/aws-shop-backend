import * as AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getAllItemsOfTable = async (tableName: string) => {
  const scanResult = await dynamo.scan({
    TableName: tableName,
  }).promise();

  return scanResult.Items;
};

export const getItemFromTable = async (tableName: string, id: string) => {
  const queryResult = await dynamo.query({
    TableName: tableName,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {':id': id},
  }).promise();

  return queryResult.Items;
};

export const putItemInTable = async (tableName: string, item: Object | Array<Object>) => {
  const putResult = await dynamo.put({
    TableName: tableName,
    Item: item,
  }).promise();

  return putResult;
};
