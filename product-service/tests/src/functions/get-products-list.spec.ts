import { getProductsList } from '../../../src/functions/get-products-list/handler';
import { okRESTResponseMock } from './handler.mock';

jest.mock('../../../src/shared/services/api-gateway.service');
jest.mock('../../../src/shared/services/join-tables.service');
jest.mock('../../../src/shared/services/dynamoDB.service');
import { getAllItemsOfTable } from '../../../src/shared/services/dynamoDB.service';
import { joinTables } from '../../../src/shared/services/join-tables.service';
import { formOkRESTResponse } from '../../../src/shared/services/api-gateway.service';

describe('getProductsList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call formRESTResponse and return formatted REST response', async () => {
    (formOkRESTResponse as any).mockReturnValue(okRESTResponseMock);

    const productListRESTResponse = await getProductsList();

    expect(getAllItemsOfTable).toBeCalledTimes(2);
    expect(joinTables).toBeCalled();
    expect(formOkRESTResponse).toBeCalled();
    expect(productListRESTResponse).toMatchObject({
      statusCode: okRESTResponseMock.statusCode,
      headers: okRESTResponseMock.headers,
      body: okRESTResponseMock.body,
    });
  });
});
