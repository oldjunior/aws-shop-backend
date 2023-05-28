import * as process from 'process';
import {
  APIGatewayTokenAuthorizerEvent,
  CustomAuthorizerCallback,
  CustomAuthorizerResult
} from 'aws-lambda';

export const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent, context: unknown, cb: CustomAuthorizerCallback) => {
  const authToken: string | null = event.authorizationToken?.replace('Basic', '') || null;

  if (authToken) {
    cb('Unauthorized');
  }

  try {
    const [login, decodedPassword] = Buffer.from(authToken, 'base64').toString('utf-8').split(':');
    const password = process.env[login] || '';
    const policyEffect = decodedPassword === password ? 'Allow' : 'Deny';
    const authResult = createAuthResult(authToken, event.methodArn, policyEffect);

    cb(null, authResult);
  } catch (error) {
    cb(`Something went wrong: ${error.message}`)
  }
}

const createAuthResult = (principalId: string, resource: string, effect = 'Deny'): CustomAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});
