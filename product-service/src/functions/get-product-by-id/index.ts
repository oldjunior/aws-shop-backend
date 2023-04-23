import { handlerPath } from '@services/handler-resolver.service';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
      },
    },
  ],
};
