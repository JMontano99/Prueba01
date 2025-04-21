import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HttpClient,
} from '@angular/common/http';
import { LoggerManagerService } from './services/logger-manager.service';
import {
  AngularFireAnalytics,
  DEBUG_MODE,
  ScreenTrackingService,
  AngularFireAnalyticsModule,
} from '@angular/fire/compat/analytics';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LogService } from './services/log.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http);
          },
          deps: [HttpClient],
        },
      }),
      KeycloakAngularModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAnalyticsModule
    ),
    LogService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: LoggerManagerService,
      useFactory: initializeLoggerService,
      deps: [AngularFireAnalytics],
    },
    // MODO DEBUG SOLO PARA DESARROLLO, ELIMINAR EN PROYECTO REAL
    { provide: DEBUG_MODE, useValue: true },
    // ESTE SERVICIO HACE LOG AUTOMÁTICO DE NAVEGACIÓN ENTRE PANTALLAS BASADO EN ANGULAR ROUTER
    // https://github.com/angular/angularfire/blob/master/docs/analytics/getting-started.md#tracking-screen-views
    ScreenTrackingService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
};

function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        // redirectUri: environment.keycloak.redirectUri
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      // ENDPOITNS SIN INYECCION DE TOKEN EN ENCABEZADOS
      bearerExcludedUrls: [],
    });
}

function initializeLoggerService(
  googleAnalytics: AngularFireAnalytics
): LoggerManagerService {
  return new LoggerManagerService(googleAnalytics, environment.loggerStrategy);
}
