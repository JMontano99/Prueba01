import { TestBed } from '@angular/core/testing';
import { LoggerStrategies } from '../constants/logger';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { LoggerManagerService } from './logger-manager.service';

describe('LoggerManagerService', () => {
  let service: LoggerManagerService;
  let analyticsServiceMock: jasmine.SpyObj<AngularFireAnalytics>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAnalytics, useValue: analyticsServiceMock },
        { provide: LoggerStrategies, useValue: LoggerStrategies.GOOGLE },
        {
          provide: LoggerManagerService,
          useValue: new LoggerManagerService(analyticsServiceMock),
        },
      ],
    });
    service = TestBed.inject(LoggerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call exception', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
    const spyLogger = spyOn((<any>service).logger, 'exception');
    service.exception('error', false);
    expect(spyLogger).toHaveBeenCalledOnceWith('error', false);
  });

  it('should call event', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
    const spyLogger = spyOn((<any>service).logger, 'event');
    service.event('event');
    expect(spyLogger).toHaveBeenCalledOnceWith('event');
  });
});
