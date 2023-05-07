import { randomUUID } from 'crypto';
import { SQSEvent } from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

import { putItemInTable } from '@services/dynamoDB.service';
import { Product, ProductStocksMerged, Stocks } from '@types';

const sns = new SNSClient({ region: 'eu-west-1' });

export const catalogBatchProcess = async (event: SQSEvent) => {
  const createdProducts: ProductStocksMerged[] = [];

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

    createdProducts.push({ ...productItem, ...productItemStock });
  }

  await sendNotification(createdProducts);
};

const sendNotification = async (products: ProductStocksMerged[]) => {
  await sns.send(new PublishCommand({
    Subject: 'Products created',
    Message: JSON.stringify(products),
    TopicArn: 'arn:aws:sns:eu-west-1:017902256693:product-service_catalogSNSTopic',
  }));
};
