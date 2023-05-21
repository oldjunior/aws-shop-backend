import { SQSEvent } from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';

import { catalogBatchProcess } from '../../../src/functions/catalog-batch-process/handler';

jest.mock('../../../src/shared/services/dynamoDB.service');
import { putItemInTable } from '../../../src/shared/services/dynamoDB.service';

const snsClientMock = mockClient(SNSClient);

describe('catalogBatchProcess', () => {
  afterEach(() => {
    jest.clearAllMocks();
    snsClientMock.reset();
  });

  it('should put product from SQS queue in DB', async () => {
    const mockProduct = {
      title: 'mocked product',
      description: 'mocked product desc',
      price: 10,
      count: 1
    }
    const mockSQSEvent = {
      Records: [{
        body: JSON.stringify(mockProduct),
      }],
    };

    await catalogBatchProcess(mockSQSEvent as SQSEvent);

    expect(putItemInTable).toBeCalled();
  });

  it('should publish an SNS message when price is less than 5', async () => {
    const mockProduct = {
      title: 'mocked product',
      description: 'mocked product desc',
      price: 3,
      count: 1
    }
    const mockSQSEvent = {
      Records: [{
        body: JSON.stringify(mockProduct),
      }],
    };

    await catalogBatchProcess(mockSQSEvent as SQSEvent);

    expect(snsClientMock).toHaveReceivedCommand(PublishCommand);
  });
});
