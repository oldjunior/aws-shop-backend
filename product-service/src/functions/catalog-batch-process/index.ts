import { handlerPath } from '@services/handler-resolver.service';

export default {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: 'arn:aws:sqs:eu-west-1:017902256693:product-service_catalogQueue',
      },
    },
  ],
};
