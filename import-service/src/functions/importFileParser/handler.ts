import { Readable } from 'node:stream';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client } from '@aws-sdk/client-s3';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
// @ts-ignore
import csvParser = require('csv-parser');

import { logger } from '../../shared/utils/logger';
import {ProductStocksMerged} from "@types";

const BUCKET = 'aws-s3-import-service';

const s3 = new S3Client({ region: 'eu-west-1' });
const sqs = new SQSClient({ region: 'eu-west-1' });

export const importFileParser = async () => {
  const objList = await s3.send(new ListObjectsV2Command({Bucket: BUCKET, Prefix: 'uploaded/'}));
  const bucketObj = objList.Contents.filter(item => item.Size)[0];
  const { Body: stream } = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: bucketObj.Key }));

  (stream as Readable).pipe(csvParser())
    .on('data', async (data: Omit<ProductStocksMerged, 'id'>) => {
      await sqs.send(new SendMessageCommand({
        QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/017902256693/product-service_catalogQueue',
        MessageBody: JSON.stringify(data),
      }))
    })
    .on('finish', async () => {
      await s3.send(new CopyObjectCommand({
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${bucketObj.Key}`,
        Key: `parsed/${bucketObj.Key.replace(objList.Prefix, '')}`,
      }));

      await s3.send(new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: bucketObj.Key,
      }));
    })
    .on('error', error => logger(error));
};
