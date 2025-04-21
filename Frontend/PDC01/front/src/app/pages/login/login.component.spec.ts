import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { DataService } from 'src/app/services/data.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import login from 'src/mocks/login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let securityServiceSpy: jasmine.SpyObj<SecurityService>;

  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'setGeneralNotificationMessage',
      'setToken',
    ]);
    securityServiceSpy = jasmine.createSpyObj('SecurityService', ['login']);
    securityServiceSpy.login.and.callFake(() => {
      return of(login);
    });

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([{ path: 'home', redirectTo: '' }]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        LoginComponent,
      ],
      providers: [
        { provide: SecurityService, useValue: securityServiceSpy },
        { provide: DataService, useValue: dataServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    component.login();
    expect(securityServiceSpy.login).toHaveBeenCalled();
    expect(dataServiceSpy.setToken).toHaveBeenCalled();
  });

  it('should login with error', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    securityServiceSpy.login.and.callFake(() => {
      return throwError(() => 'error!');
    });
    expect(component).toBeTruthy();
    component.login();
    expect(securityServiceSpy.login).toHaveBeenCalled();
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalled();
  });
});
