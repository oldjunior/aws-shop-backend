import { randomUUID } from 'crypto';
import { APIGatewayProxyEvent } from 'aws-lambda';

import {
  formBadRequestRESTResponse,
  formCreatedRESTResponse,
  formInternalErrorRESTResponse
} from '@services/api-gateway.service';
import { putItemInTable } from '@services/dynamoDB.service';
import { Product, ProductStocksMerged, Stocks } from '@types';
import { validateProduct } from '../../validation/validator';
import { logger } from '../../shared/utils/logger';


export const createProduct = async (event: APIGatewayProxyEvent) => {
  const productToCreate: Omit<ProductStocksMerged, 'id'> = JSON.parse(event.body);
  const productId = randomUUID();
  const productItem: Product = {
    id: productId,
    title: productToCreate.title,
    description: productToCreate.description,
    price: productToCreate.price,
  };
  const productItemStock: Stocks = {
    id: productId,
    count: productToCreate.count,
  };

  logger(`POST: /products; payload: ${event.body}`);

  if (!validateProduct(productToCreate)) {
    return formBadRequestRESTResponse();
  }

  try {
    await putItemInTable(process.env.DDB_TABLE_PRODUCTS, productItem);
    await putItemInTable(process.env.DDB_TABLE_STOCKS, productItemStock);
  } catch (error) {
    return formInternalErrorRESTResponse();
  }
  return formCreatedRESTResponse({...productItem, ...productItemStock});
};
