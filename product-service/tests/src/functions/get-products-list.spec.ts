import { getProductsList } from '../../../src/functions/get-products-list/handler';
import { RESTResponseMock } from './handler.mock';

jest.mock('../../../src/libs/api-gateway');
import { formRESTResponse } from '../../../src/libs/api-gateway';

describe('getProductsList', () => {
  it('should call formRESTResponse and return formatted REST response', async () => {
    (formRESTResponse as any).mockReturnValue(RESTResponseMock);

    const productListRESTResponse = await getProductsList();

    expect(formRESTResponse).toBeCalled();
    expect(productListRESTResponse).toMatchObject({
      statusCode: RESTResponseMock.statusCode,
      headers: RESTResponseMock.headers,
      body: RESTResponseMock.body,
    });
  });
});
