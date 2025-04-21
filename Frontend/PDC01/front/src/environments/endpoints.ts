import { environment } from './environment';

export const Endpoints = {
  security: {
    login: `${environment.baseUrl}/login?delay=2`,
  },
  demo: {
    colors: `${environment.baseUrl}/unknown`,
  },
  users: {
    users: `${environment.usersURL}/users`,
  },
};

export const TokenExcludedEndpoints = ['login'];
