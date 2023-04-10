import { APIGatewayProxyEvent } from 'aws-lambda';

import {
  formInternalErrorRESTResponse,
  formNotFoundRESTResponse,
  formOkRESTResponse
} from '@services/api-gateway.service';
import { getItemFromTable } from '@services/dynamoDB.service';
import { joinTables } from '@services/join-tables.service';
import { ProductStocksMerged } from '@types';
import { logger } from '../../shared/utils/logger';

export const getProductById = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;

  logger(`GET: /products/${productId}`);

  try {
    const productItem = await getItemFromTable(process.env.DDB_TABLE_PRODUCTS, productId);
    const productStocks = await getItemFromTable(process.env.DDB_TABLE_STOCKS, productId);
    const product: ProductStocksMerged[] = joinTables(productItem, productStocks);

    return product.length > 0 ? formOkRESTResponse(product) : formNotFoundRESTResponse();
  } catch (error) {
    return formInternalErrorRESTResponse();
  }
};
