import { formRESTResponse } from '@libs/api-gateway';
import productsMock from '@mocks/products-mock';

export const getProductsList = async () => {
  return formRESTResponse(productsMock);
};
