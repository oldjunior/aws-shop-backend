import { RESTResponse } from '@types';

export const formRESTResponse = (response:  Object | Array<Object>): RESTResponse =>({
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify(response)
});

export const formNotFoundRESTResponse = (): RESTResponse =>({
  statusCode: 404,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify({ error: 'Resource not found' })
});
