import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColorDetailComponent } from './color-detail.component';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ColorsService } from 'src/app/services/colors.service';
import { MatListModule } from '@angular/material/list';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import color from 'src/mocks/color';

describe('ColorDetailComponent', () => {
  let component: ColorDetailComponent;
  let fixture: ComponentFixture<ColorDetailComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let colorsServiceSpy: jasmine.SpyObj<ColorsService>;

  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'setGeneralNotificationMessage',
      'setIsLoading',
    ]);
    colorsServiceSpy = jasmine.createSpyObj('ColorsService', ['getColor']);
    colorsServiceSpy.getColor.and.callFake(() => {
      return of(color);
    });

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        MatListModule,
        ColorDetailComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
        { provide: DataService, useValue: dataServiceSpy },
        { provide: ColorsService, useValue: colorsServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ColorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColor).toHaveBeenCalled();
    expect(component.color).toEqual(color.data);
  });

  it('should create with no route', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { params: of({}) } });
    fixture = TestBed.createComponent(ColorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColor).not.toHaveBeenCalled();
  });

  it('should create with error', () => {
    colorsServiceSpy.getColor.and.callFake(() => {
      return throwError(() => 'error!');
    });

    fixture = TestBed.createComponent(ColorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColor).toHaveBeenCalled();
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalled();
  });
});
