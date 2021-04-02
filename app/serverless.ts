import type { Serverless } from 'serverless/aws';


const serverlessConfiguration: Serverless = {
  service: {
    name: 'shop4me-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '1',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },

  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'matt.miller',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource: 'arn:aws:dynamodb:us-east-1:609487005418:table/shop4me.shopData'
      }
    ]
  },
  resources: {
    Resources: {
      shopData: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "shop4me.shopData",
          AttributeDefinitions: [
            {
              AttributeName: "pk",
              AttributeType: "S"
            },
            {
              AttributeName: "sk",
              AttributeType: "S"
            },
          ],
          KeySchema: [
            {
              AttributeName: "pk",
              KeyType: "HASH"
            },
            {
              AttributeName: "sk",
              KeyType: "RANGE"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  },

  functions: {
    search: {
      handler: 'handler.search',
      events: [
        {
          http: {
            method: 'post',
            path: 'search',
            cors: true, 
            authorizer: {
              arn: 'arn:aws:cognito-idp:us-east-2:609487005418:userpool/us-east-2_80A86RKt9'
            }
          }
        }
      ]
    },
    saveSearch: {
      handler: 'handler.save',
      events: [
        {
          http: {
            method: 'post',
            path: 'save',
            cors: true, 
            authorizer: {
              arn: 'arn:aws:cognito-idp:us-east-2:609487005418:userpool/us-east-2_80A86RKt9'
            }
          }
        }
      ]
    },
    getSearches: {
      handler: 'handler.getSearches',
      events: [
        {
          http: {
            method: 'get',
            path: 'searches',
            cors: true, 
            authorizer: {
              arn: 'arn:aws:cognito-idp:us-east-2:609487005418:userpool/us-east-2_80A86RKt9'
            }
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
