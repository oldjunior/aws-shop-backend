import { APIGatewayProxyEvent } from 'aws-lambda';

import {formNotFoundRESTResponse, formRESTResponse} from '@libs/api-gateway';
import { Product } from '@types';
import productsMock from '@mocks/products-mock';

export const getProductById = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;
  const product: Product | undefined = productsMock.find(product => product.id === productId);

  return product ? formRESTResponse(product) : formNotFoundRESTResponse();
};
