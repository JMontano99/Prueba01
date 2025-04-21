// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  production: false,
  theme: 'default-theme',
  baseUrl: 'https://reqres.in/api',
  usersURL: 'http://localhost:3000',
  keycloak,
  sse,
  loggerStrategy,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
