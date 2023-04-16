import { RESTResponse } from '@types';

export const formOkRESTResponse = (response:  Object | Array<Object>): RESTResponse =>({
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify(response),
});

export const formInternalErrorRESTResponse = (): RESTResponse =>({
  statusCode: 500,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify({ error: 'Internal Server Error' }),
});
