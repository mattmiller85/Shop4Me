import { Auth } from 'aws-amplify';

export default () => {
  return {
    socketUrl: 'wss://870olo7mrh.execute-api.us-east-2.amazonaws.com/dev',
    cognito: {
      userPoolRegion: 'us-east-2',
      userPoolId: 'us-east-2_80A86RKt9',
      userPoolWebClientId: '4u25g3i51g0gjsitut605dr4cb'
    },
    apis: [
      {
        name: 'api',
        endpoint: 'https://vft02b5v9c.execute-api.us-east-2.amazonaws.com/dev',
        region: 'us-east-2',
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` };
        }
      }
    ]
  };
};
