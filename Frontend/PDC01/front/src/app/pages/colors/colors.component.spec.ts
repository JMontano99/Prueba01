import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColorsComponent } from './colors.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ColorsService } from 'src/app/services/colors.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import colors from 'src/mocks/colors';

describe('ColorsComponent', async () => {
  let component: ColorsComponent;
  let fixture: ComponentFixture<ColorsComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let colorsServiceSpy: jasmine.SpyObj<ColorsService>;

  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'setGeneralNotificationMessage',
      'setIsLoading',
    ]);
    colorsServiceSpy = jasmine.createSpyObj('ColorsService', ['getColors']);
    colorsServiceSpy.getColors.and.callFake(() => {
      return of(colors);
    });

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        ColorsComponent,
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: ColorsService, useValue: colorsServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColors).toHaveBeenCalled();
    expect(component.data).toEqual(colors.data);
  });

  it('should create with error', () => {
    colorsServiceSpy.getColors.and.callFake(() => {
      return throwError(() => 'error!');
    });

    fixture = TestBed.createComponent(ColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColors).toHaveBeenCalled();
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalled();
  });
});
