import { APIGatewayProxyEvent } from 'aws-lambda';

import { getProductById } from '../../../src/functions/get-product-by-id/handler';
import {apiGatewayEventMock, notFoundRESTResponseMock, okRESTResponseMock, productMock} from './handler.mock';

jest.mock('../../../src/shared/services/api-gateway.service');
jest.mock('../../../src/shared/services/join-tables.service');
jest.mock('../../../src/shared/services/dynamoDB.service');
import { getItemFromTable } from '../../../src/shared/services/dynamoDB.service';
import { joinTables } from '../../../src/shared/services/join-tables.service';
import { formOkRESTResponse, formNotFoundRESTResponse } from '../../../src/shared/services/api-gateway.service';

describe('getProductById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when there is an item with passed id', () => {
    it('should get item from table, join tables, form REST response and return formatted REST response with code 200', async () => {
      (joinTables as any).mockReturnValue([productMock]);
      (formOkRESTResponse as any).mockReturnValue(okRESTResponseMock);

      const productByIdRESTResponse = await getProductById(apiGatewayEventMock as APIGatewayProxyEvent);

      expect(getItemFromTable).toBeCalledTimes(2);
      expect(joinTables).toBeCalled();
      expect(formOkRESTResponse).toBeCalled();
      expect(productByIdRESTResponse).toMatchObject({
        statusCode: okRESTResponseMock.statusCode,
        headers: okRESTResponseMock.headers,
        body: okRESTResponseMock.body,
      });
    });
  });

  describe('when there is no item with passed id', () => {
    it('should form REST response and return formatted REST response with code 404', async () => {
      (joinTables as any).mockReturnValue([]);
      (formNotFoundRESTResponse as any).mockReturnValue(notFoundRESTResponseMock);

      const productByIdRESTResponse = await getProductById(apiGatewayEventMock as APIGatewayProxyEvent);

      expect(getItemFromTable).toBeCalledTimes(2);
      expect(joinTables).toBeCalled();
      expect(formNotFoundRESTResponse).toBeCalled();
      expect(productByIdRESTResponse).toMatchObject({
        statusCode: notFoundRESTResponseMock.statusCode,
        headers: notFoundRESTResponseMock.headers,
        body: notFoundRESTResponseMock.body,
      });
    });
  });
});
