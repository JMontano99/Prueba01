/* eslint-disable @typescript-eslint/no-explicit-any */
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SseEvent, SseEventType, SseService } from './sse.service';

describe('SseService', () => {
  let service: SseService;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['getToken']);
    TestBed.configureTestingModule({
      providers: [{ provide: KeycloakService, useValue: keycloakServiceSpy }],
    });
    service = TestBed.inject(SseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get observable', () => {
    expect(
      service.getServerSentEvent('http://sse-test') instanceof Observable
    ).toBeTruthy();
  });

  it('should start subscription and open connection with authenticated user', (done) => {
    keycloakServiceSpy.getToken.and.returnValue(Promise.resolve('token'));
    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
    ]);

    mockEventSource.addEventListener.and.callFake(
      (evt: unknown, callback: any) => {
        if (evt === 'open') {
          callback();
        }
      }
    );

    spyOn(service as any, 'eventSourceFactory').and.callFake(() => {
      return mockEventSource;
    });

    service.getServerSentEvent('http://sse-test').subscribe((evt: SseEvent) => {
      expect(evt.type === SseEventType.connectionUp).toBeTrue();
      expect(evt.data).toBeUndefined();
      done();
    });
  });

  it('should start subscription and open connection', (done) => {
    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
    ]);

    mockEventSource.addEventListener.and.callFake((evt: any, callback: any) => {
      if (evt === 'open') {
        callback();
      }
    });

    spyOn(service as any, 'eventSourceFactory').and.callFake(() => {
      return mockEventSource;
    });

    service.getServerSentEvent('http://sse-test').subscribe((evt: SseEvent) => {
      expect(evt.type === SseEventType.connectionUp).toBeTrue();
      expect(evt.data).toBeUndefined();
      done();
    });
  });

  it('should start subscription and receieve message', (done) => {
    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
    ]);

    mockEventSource.addEventListener.and.callFake((evt: any, callback: any) => {
      if (evt === 'message') {
        callback({ data: 'hello' });
      }
    });

    spyOn(service as any, 'eventSourceFactory').and.callFake(() => {
      return mockEventSource;
    });

    service.getServerSentEvent('http://sse-test').subscribe((evt: SseEvent) => {
      expect(evt.type === SseEventType.data).toBeTrue();
      expect(evt.data).toBe('hello');
      done();
    });
  });

  it('should start subscription and get connection error, retry and close', fakeAsync(() => {
    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
      'close',
    ]);

    mockEventSource.addEventListener.and.callFake((evt: any, callback: any) => {
      if (evt === 'error') {
        callback('error');
      }
    });

    spyOn(service as any, 'eventSourceFactory').and.callFake(() => {
      return mockEventSource;
    });

    service.getServerSentEvent('http://sse-test').subscribe({
      next: (evt: SseEvent) => {
        if ((service as any).retries < environment.sse.maxRetries) {
          expect(evt.type === SseEventType.reconnecting).toBeTrue();
        } else {
          expect(evt.type === SseEventType.connectionDown).toBeTrue();
        }
      },
      error: (err) => {
        expect(err).toBe('error');
      },
    });

    tick(Infinity);
  }));

  it('should destroy connection', fakeAsync(async () => {
    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
      'close',
    ]);

    mockEventSource.addEventListener.and.callFake((evt: any, callback: any) => {
      if (evt === 'open') {
        callback();
      }
    });

    spyOn(service as any, 'eventSourceFactory').and.callFake(() => {
      return mockEventSource;
    });

    service.getServerSentEvent('http://sse-test').subscribe();

    tick();

    service.destroy();

    expect(mockEventSource.close).toHaveBeenCalled();
    expect((service as any).eventSource).toBeUndefined();
  }));

  it('should try destroy connection', () => {
    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
      'close',
    ]);

    mockEventSource.addEventListener.and.callFake((evt: any, callback: any) => {
      if (evt === 'open') {
        callback();
      }
    });

    spyOn(service as any, 'eventSourceFactory').and.callFake(() => {
      return mockEventSource;
    });

    service.destroy();
    expect(mockEventSource.close).not.toHaveBeenCalled();
    expect((service as any).eventSource).toBeUndefined();
  });

  it('should try destroy connection manually', () => {
    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
      'close',
    ]);

    mockEventSource.addEventListener.and.callFake((evt: any, callback: any) => {
      if (evt === 'open') {
        callback();
      }
    });

    spyOn(service as any, 'eventSourceFactory').and.callFake(() => {
      return mockEventSource;
    });

    service.stopManually();
    expect(mockEventSource.close).not.toHaveBeenCalled();
    expect((service as any).retries).toEqual(0);
    expect((service as any).eventSource).toBeUndefined();
  });

  it('should create event source instance with token', async () => {
    keycloakServiceSpy.getToken.and.returnValue(Promise.resolve('token'));

    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
    ]);

    spyOn(window, 'EventSource').and.callFake(function EventSource(url) {
      mockEventSource.url = url;
      return mockEventSource;
    });

    const ev = await (service as any).eventSourceFactory('http://sse-test');
    expect(ev.addEventListener).toBeDefined();
    expect(ev.url.includes('access_token=token')).toBeTrue();
  });

  it('should create event source instance without token', async () => {
    keycloakServiceSpy.getToken.and.returnValue(Promise.reject());

    const mockEventSource = jasmine.createSpyObj('EventSource', [
      'addEventListener',
    ]);

    spyOn(window, 'EventSource').and.callFake(function EventSource(url) {
      mockEventSource.url = url;
      return mockEventSource;
    });

    const ev = await (service as any).eventSourceFactory('http://sse-test');
    expect(ev.addEventListener).toBeDefined();
    expect(ev.url.includes('access_token=token')).toBeFalse();
  });
});
