import { LoggerStrategies } from 'src/app/constants/logger';

const keycloak = {
  url: 'https://keycloak.axity.com',
  realm: 'swd',
  clientId: 'angular',
};

const sse = {
  url: 'http://localhost:9220',
  retryInterval: 5000,
  maxRetries: 10,
};

const loggerStrategy = LoggerStrategies.GOOGLE;

export const environment = {
  firebase: {
    projectId: 'angular-archetype',
    appId: '1:345615968686:web:072040fdd8edc70ceb403f',
    storageBucket: 'angular-archetype.appspot.com',
    apiKey: 'AIzaSyA9fQB2c1yCxwhjMVFBfWW0DfNBUAhwqCc',
    authDomain: 'angular-archetype.firebaseapp.com',
    messagingSenderId: '345615968686',
    measurementId: 'G-W650607S7L',
  },
  production: true,
  theme: 'default-theme',
  baseUrl: 'https://reqres.in/api',
  usersURL: 'http://localhost:3000',
  keycloak,
  sse,
  loggerStrategy,
};
