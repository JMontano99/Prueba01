import {
  TestBed,
  ComponentFixture,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeSwitcherService } from './services/theme-switcher.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { KeycloakService } from 'keycloak-angular';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let matIcon: MatIconRegistry;
  let translate: TranslateService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let matSnackbarSpy: jasmine.SpyObj<MatSnackBar>;
  let themeSwitcherSpy: jasmine.SpyObj<ThemeSwitcherService>;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  const messageSubject = new Subject<string>();

  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'getIsLoading',
      'getToken',
      'getGeneralNotificationMessage',
    ]);
    dataServiceSpy.getGeneralNotificationMessage.and.callFake(() => {
      return messageSubject;
    });
    matSnackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    themeSwitcherSpy = jasmine.createSpyObj('ThemeSwitcherService', [
      'loadTheme',
    ]);
    keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['logout']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient],
          },
        }),
        MatToolbarModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
        AppComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: MatSnackBar, useValue: matSnackbarSpy },
        { provide: ThemeSwitcherService, useValue: themeSwitcherSpy },
        { provide: KeycloakService, useValue: keycloakServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    matIcon = TestBed.inject(MatIconRegistry);
    translate = TestBed.inject(TranslateService);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header button').textContent).toContain(
      'my-app'
    );
  });

  it('should setup custom icons', (done) => {
    const app = fixture.debugElement.componentInstance;
    app.setupCustomIcons();
    fixture.whenStable().then(() => {
      matIcon.getNamedSvgIcon('mex').subscribe((res) => {
        expect(res).toBeDefined();
        done();
      });
    });
  });

  it('should change language', (done) => {
    const app = fixture.debugElement.componentInstance;
    app.changeLanguage('en');
    translate.get('language.en').subscribe((res) => {
      expect(res).toBe('English');
      done();
    });
  });

  it('should show general message', fakeAsync(() => {
    messageSubject.next('msg');
    tick(100);
    expect(matSnackbarSpy.open).toHaveBeenCalled();
  }));

  it('should change theme', () => {
    const app = fixture.debugElement.componentInstance;
    app.changeTheme('axity-theme');
    expect(themeSwitcherSpy.loadTheme).toHaveBeenCalled();
  });

  it('should logout', () => {
    const app = fixture.debugElement.componentInstance;
    app.logout();
    expect(keycloakServiceSpy.logout).toHaveBeenCalled();
  });
});
