import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductById, createProduct } from '@functions';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-auto-swagger', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: '*'
      },
    ],
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductById,
    createProduct,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      host: 'p9ab3z37w7.execute-api.eu-west-1.amazonaws.com/dev',
    },
  },
};

module.exports = serverlessConfiguration;
