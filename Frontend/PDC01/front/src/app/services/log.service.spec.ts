import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    spyOn(console, 'log');
    spyOn(console, 'warn');
    spyOn(console, 'error');
    spyOn(console, 'trace');

    TestBed.configureTestingModule({
      providers: [LogService],
    });
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log', () => {
    expect(service).toBeTruthy();
    environment.production = false;
    LogService.log();
    expect(console.log).toHaveBeenCalled();
  });

  it('should not log', () => {
    expect(service).toBeTruthy();
    environment.production = true;
    LogService.log();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should warn', () => {
    expect(service).toBeTruthy();
    environment.production = false;
    LogService.warning();
    expect(console.warn).toHaveBeenCalled();
  });

  it('should not log', () => {
    expect(service).toBeTruthy();
    environment.production = true;
    LogService.warning();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should error', () => {
    expect(service).toBeTruthy();
    environment.production = false;
    LogService.error();
    expect(console.error).toHaveBeenCalled();
  });

  it('should not error', () => {
    expect(service).toBeTruthy();
    environment.production = true;
    LogService.error();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should trace', () => {
    expect(service).toBeTruthy();
    environment.production = false;
    LogService.trace();
    expect(console.trace).toHaveBeenCalled();
  });

  it('should not error', () => {
    expect(service).toBeTruthy();
    environment.production = true;
    LogService.trace();
    expect(console.trace).not.toHaveBeenCalled();
  });
});
