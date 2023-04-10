import { APIGatewayProxyEvent } from 'aws-lambda';
import { ProductStocksMerged, RESTResponse } from '../../../src/types';

export const productMock: ProductStocksMerged = {
  id: 'de4769c3-148a-4183-9ba9-fbe909d72aa4',
  title: 'mock product name',
  description: 'mock product description',
  price: 123,
  count: 456,
};

export const okRESTResponseMock: RESTResponse = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: `[
    {
      "id": "de4769c3-148a-4183-9ba9-fbe909d72aa1",
      "title": "mock product1 name",
      "description": "mock product1 description",
      "price": 123,
      "count": 456
    },
    {
      "id": "de4769c3-148a-4183-9ba9-fbe909d72aa2",
      "title": "mock product2 name",
      "description": "mock product2 description",
      "price": 123,
      "count": 456
    }
  ]`,
};

export const createdRESTResponseMock: RESTResponse = {
  statusCode: 201,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: `{
    "id": "de4769c3-148a-4183-9ba9-fbe909d72aa4",
    "title": "mock product name",
    "description": "mock product description",
    "price": 123,
    "count": 456
  }`,
};

export const notFoundRESTResponseMock: RESTResponse = {
  statusCode: 404,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: `{"error": "Resource not found"}`,
};

export const apiGatewayEventMock: Pick<APIGatewayProxyEvent, 'body' | 'pathParameters'> = {
  body: `{
    "title": "mock product name",
    "description": "mock product description",
    "price": 123,
    "count": 456
  }`,
  pathParameters: { productId: 'de4769c3-148a-4183-9ba9-fbe909d72aa4' },
};
