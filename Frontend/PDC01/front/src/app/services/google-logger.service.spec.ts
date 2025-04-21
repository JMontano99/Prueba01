import { TestBed } from '@angular/core/testing';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { GoogleLogEvents } from '../constants/logger';

import { GoogleLoggerStrategy } from './google-logger.service';

describe('GoogleLoggerStrategy', () => {
  let service: GoogleLoggerStrategy;
  let analyticsServiceMock: jasmine.SpyObj<AngularFireAnalytics>;

  beforeEach(() => {
    analyticsServiceMock = jasmine.createSpyObj<AngularFireAnalytics>(
      'AngularFireAnalytics',
      ['logEvent']
    );
    analyticsServiceMock.logEvent.and.callFake(() => {
      return Promise.resolve();
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAnalytics, useValue: analyticsServiceMock },
        {
          provide: GoogleLoggerStrategy,
          useValue: new GoogleLoggerStrategy(analyticsServiceMock),
        },
      ],
    });
    service = TestBed.inject(GoogleLoggerStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send exception', () => {
    service.exception('error', true);
    expect(analyticsServiceMock.logEvent).toHaveBeenCalledWith(
      GoogleLogEvents.exception,
      {
        exDescription: 'error',
        exFatal: true,
      }
    );
  });

  it('should send event', () => {
    service.event('event');
    expect(analyticsServiceMock.logEvent).toHaveBeenCalledWith('event');
  });
});
