import * as AWS from 'aws-sdk';

import { APIGatewayProxyEvent } from 'aws-lambda';
import {formInternalErrorRESTResponse, formOkRESTResponse} from '@services/api-gateway.service';

const BUCKET = 'aws-s3-import-service';

const s3 = new AWS.S3({ region: 'eu-west-1' });

export const importProductsFile = async (event: APIGatewayProxyEvent) => {
  const { name: catalogFileName } = event.queryStringParameters;
  const params = {
    Bucket: BUCKET,
    Key: `uploaded/${catalogFileName}`,
    Expires: 60,
    ContentType: 'text/csv',
  };

  try {
    const presignedURL = await s3.getSignedUrlPromise('putObject', params);

    return formOkRESTResponse(presignedURL);
  } catch (error) {
    return formInternalErrorRESTResponse();
  }
};
