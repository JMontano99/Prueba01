import { TestBed, inject } from '@angular/core/testing';

import { ConsumeService } from './consume.service';
import { Observable } from 'rxjs';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { LoggerManagerService } from './logger-manager.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ConsumeService', () => {
  let service: ConsumeService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let loggerManagerServiceSpy: jasmine.SpyObj<LoggerManagerService>;

  beforeEach(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['setIsLoading']);
    loggerManagerServiceSpy = jasmine.createSpyObj('LoggerManagerService', [
      'exception',
    ]);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: LoggerManagerService, useValue: loggerManagerServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ConsumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create get observable', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpGet<unknown>('http://localhost');
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe((res) => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('GET');

      req.flush({});
    }
  ));

  it('should create get observable with params and headers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpGet<unknown>(
        'http://localhost',
        { param: '1' },
        { header: '1' }
      );
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe((res) => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost?param=1');
      expect(req.request.method).toEqual('GET');

      req.flush({});
    }
  ));

  it('should create post observable', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpPost<unknown>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe((res) => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('POST');

      req.flush({});
    }
  ));

  it('should create post observable with params and headers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpPost<unknown>(
        'http://localhost',
        { param: '1' },
        { header: '1' }
      );
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe((res) => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('POST');

      req.flush({});
    }
  ));

  it('should create put observable', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpPut<unknown>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe((res) => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('PUT');

      req.flush({});
    }
  ));

  it('should create put observable with params and headers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpPut<unknown>(
        'http://localhost',
        { param: '1' },
        { header: '1' }
      );
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe((res) => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('PUT');

      req.flush({});
    }
  ));

  it('should create get observable with error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpGet<unknown>('http://localhost');
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe({
        error: (err) => {
          expect(err).toBeDefined();
        },
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('GET');

      req.error(new ProgressEvent('err'));
    }
  ));

  it('should create post observable', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpPost<unknown>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe({
        error: (err) => {
          expect(err).toBeDefined();
        },
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('POST');

      req.error(new ProgressEvent('err'));
    }
  ));

  it('should create put observable', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpPut<unknown>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe({
        error: (err) => {
          expect(err).toBeDefined();
        },
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('PUT');

      req.error(new ProgressEvent('err'));
    }
  ));

  it('should create delete observable', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpDelete<unknown>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe({
        error: (err) => {
          expect(err).toBeDefined();
        },
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('DELETE');

      req.error(new ProgressEvent('err'));
    }
  ));

  it('should create delete observable with params and headers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.httpDelete<unknown>(
        'http://localhost',
        { param: '1' },
        { header: '1' }
      );
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe((res) => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost?param=1');
      expect(req.request.method).toEqual('DELETE');

      req.flush({});
    }
  ));
});
