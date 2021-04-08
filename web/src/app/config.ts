import { Auth } from 'aws-amplify';

export default () => {
  return {
    cognito: {
      userPoolRegion: 'us-east-2',
      userPoolId: 'us-east-2_80A86RKt9',
      userPoolWebClientId: '4u25g3i51g0gjsitut605dr4cb'
    },
    apis: [
      {
        name: 'api',
        // endpoint: 'http://localhost:3000/dev',
        endpoint: 'https://xj3ib1h8w0.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-2',
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` };
        }
      }
    ]
  };
};
