import { randomUUID } from 'crypto';
import { SQSEvent } from 'aws-lambda';

import { putItemInTable } from '@services/dynamoDB.service';
import { Product, ProductStocksMerged, Stocks } from '@types';

export const catalogBatchProcess = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const productToCreate: Omit<ProductStocksMerged, 'id'> = JSON.parse(record.body);
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

    await putItemInTable(process.env.DDB_TABLE_PRODUCTS, productItem);
    await putItemInTable(process.env.DDB_TABLE_STOCKS, productItemStock);
  }
};
