import { handlerPath } from '@services/handler-resolver.service';

export default {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
      },
    },
  ],
};
