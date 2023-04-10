import { RESTResponse } from '@types';

export const formOkRESTResponse = (response:  Object | Array<Object>): RESTResponse =>({
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify(response),
});

export const formCreatedRESTResponse = (response: Object | Array<Object>): RESTResponse =>({
  statusCode: 201,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify(response),
});

export const formBadRequestRESTResponse = (): RESTResponse =>({
  statusCode: 400,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify({ error: 'Bad request' }),
});

export const formNotFoundRESTResponse = (): RESTResponse =>({
  statusCode: 404,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify({ error: 'Resource not found' }),
});

export const formInternalErrorRESTResponse = (): RESTResponse =>({
  statusCode: 500,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify({ error: 'Internal Server Error' }),
});
