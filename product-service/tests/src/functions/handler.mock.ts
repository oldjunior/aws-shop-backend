import { RESTResponse } from '../../../src/types';

export const RESTResponseMock: RESTResponse = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: `[
    {"title": "product1"},
    {"title": "product2"}
  ]`
};
