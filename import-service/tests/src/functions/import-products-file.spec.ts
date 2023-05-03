import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWSMock from 'aws-sdk-mock';

import { importProductsFile } from '../../../src/functions/importProductsFile/handler';
import { RESTResponseMock } from './handler.mock';

const mockEvent = {
  queryStringParameters:
    { name: 'mock.csv' }
};

describe('importProductsFile', () => {
  it('should return formatted REST response with a pre-signed url', async () => {
    AWSMock.mock('S3', 'getSignedUrl', 'pre-signed url');

    const importProductsFileRESTResponse = await importProductsFile(mockEvent as unknown as APIGatewayProxyEvent);

    expect(importProductsFileRESTResponse).toMatchObject({
      statusCode: RESTResponseMock.statusCode,
      headers: RESTResponseMock.headers,
      body: '"pre-signed url"',
    });
  });
});
