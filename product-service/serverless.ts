import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductById, createProduct, catalogBatchProcess } from '@functions';

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
      {
        Effect: 'Allow',
        Action: [
          'sqs:ReceiveMessage',
          'sqs:DeleteMessage',
          'sqs:GetQueueAttributes'
        ],
        Resource: '*',
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: '*',
      },
    ],
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductById,
    createProduct,
    catalogBatchProcess
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      host: 'fy7oypucx8.execute-api.eu-west-1.amazonaws.com/dev',
    },
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:service}_catalogQueue'
        },
      },
      catalogSNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: '${self:service}_catalogSNSTopic'
        },
      },
      catalogSNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'EMAIL_FOR_NOTIFICATIONS',
          Protocol: 'email',
          TopicArn: {
            Ref: 'catalogSNSTopic'
          },
        },
      },
      catalogSNSSubscriptionLowPrice: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'EMAIL_FOR_FILTERED_NOTIFICATIONS',
          Protocol: 'email',
          TopicArn: {
            Ref: 'catalogSNSTopic'
          },
          FilterPolicyScope: 'MessageAttributes',
          FilterPolicy: {
            is_low_price: ['true'],
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
