import { handlerPath } from '@services/handler-resolver.service';

export default {
  handler: `${handlerPath(__dirname)}/handler.importFileParser`,
  events: [
    {
      s3: {
        bucket: 'aws-s3-import-service',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/'
          },
        ],
        existing: true,
      },
    },
  ],
};
