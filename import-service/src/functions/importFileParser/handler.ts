import { Readable } from 'node:stream';
import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
// @ts-ignore
import csvParser = require('csv-parser');

import { logger } from '../../shared/utils/logger';

const BUCKET = 'aws-s3-import-service';

const s3 = new S3Client({ region: 'eu-west-1' });

export const importFileParser = async () => {
  const objList = await s3.send(new ListObjectsV2Command({Bucket: BUCKET, Prefix: 'uploaded/'}));
  const bucketObj = objList.Contents.filter(item => item.Size)[0];
  const { Body: stream } = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: bucketObj.Key }));

  (stream as Readable).pipe(csvParser())
    .on('data', data => logger(data))
    .on('error', error => logger(error));
};
