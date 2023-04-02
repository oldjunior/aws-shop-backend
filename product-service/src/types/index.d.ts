export interface Product {
  id: string;
  title: string;
  count: number;
  description: string;
  price: number;
}

export interface RESTResponse {
  statusCode: HttpStatusCode;
  headers: Object;
  body: string;
}

declare enum HttpStatusCode {
  OK = 200,
  NoContent = 204,
  NotFound = 404
}
