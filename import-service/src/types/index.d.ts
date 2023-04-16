export interface RESTResponse {
  statusCode: HttpStatusCode;
  headers: Object;
  body?: string;
}

declare enum HttpStatusCode {
  OK = 200,
  Created = 204,
  NoContent = 204,
  NotFound = 404
}
