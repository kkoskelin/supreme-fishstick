import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  custom: {
    esbuild: {
      bundle: true,
      concurrency: 10,
      define: { 'require.resolve': undefined },
      exclude: ['aws-sdk'],
      minify: false,
      platform: 'node',
      sourcemap: true,
      target: 'node14',
    },
  },

  frameworkVersion: '3',

  // import the function via paths
  functions: { hello },

  package: { individually: true },

  plugins: ['serverless-esbuild'],
  provider: {
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    name: 'aws',
    runtime: 'nodejs14.x',
  },
  service: 'api',
};

module.exports = serverlessConfiguration;
