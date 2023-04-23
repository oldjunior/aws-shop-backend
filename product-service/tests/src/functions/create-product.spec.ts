import { APIGatewayProxyEvent } from 'aws-lambda';

import { createProduct } from '../../../src/functions/create-product/handler';
import { apiGatewayEventMock, createdRESTResponseMock } from './handler.mock';

jest.mock('../../../src/shared/services/api-gateway.service');
jest.mock('../../../src/shared/services/dynamoDB.service');
import { putItemInTable } from '../../../src/shared/services/dynamoDB.service';
import { formCreatedRESTResponse } from '../../../src/shared/services/api-gateway.service';

describe('createProduct', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should add id to a product, put in DB and return formatted REST response with code 201', async () => {
    (formCreatedRESTResponse as any).mockReturnValue(createdRESTResponseMock);

    const createProductRESTResponse = await createProduct(apiGatewayEventMock as APIGatewayProxyEvent);

    expect(putItemInTable).toBeCalled();
    expect(formCreatedRESTResponse).toBeCalled();
    expect(createProductRESTResponse).toMatchObject({
      statusCode: createdRESTResponseMock.statusCode,
      headers: createdRESTResponseMock.headers,
      body: createdRESTResponseMock.body,
    });
  });
});
