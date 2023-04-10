import {formInternalErrorRESTResponse, formOkRESTResponse} from '@services/api-gateway.service';
import { getAllItemsOfTable } from '@services/dynamoDB.service';
import { joinTables } from '@services/join-tables.service';
import { logger } from '../../shared/utils/logger';

export const getProductsList = async () => {
  logger(`GET: /products`);

  try {
    const productItemsList = await getAllItemsOfTable(process.env.DDB_TABLE_PRODUCTS);
    const productStocksList = await getAllItemsOfTable(process.env.DDB_TABLE_STOCKS);
    const joinedItemsStocksList = joinTables(productItemsList, productStocksList);

    return formOkRESTResponse(joinedItemsStocksList || []);
  } catch (error) {
    return formInternalErrorRESTResponse();
  }
};
