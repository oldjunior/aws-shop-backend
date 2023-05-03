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

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface Stocks {
  id: string;
  count: number;
}

export type ProductStocksMerged = Product & Stocks;

export interface Stocks {
  id: string;
  count: number;
}
