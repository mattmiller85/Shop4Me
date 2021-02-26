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
    }
  }
}

module.exports = serverlessConfiguration;
