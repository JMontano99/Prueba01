import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should is loading true', (done) => {
    service.getIsLoading().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
    service.setIsLoading(true);
  });

  it('should is loading false', (done) => {
    service.getIsLoading().subscribe((res) => {
      expect(res).toBeFalsy();
      done();
    });
    service.setIsLoading(false);
  });

  it('should set message', (done) => {
    service.getGeneralNotificationMessage().subscribe((res) => {
      expect(res).toBe('test');
      done();
    });
    service.setGeneralNotificationMessage('test');
  });

  it('should set token', () => {
    service.setToken('token');
    expect(service.getToken()).toBe('token');
  });

  it('should remove token', () => {
    service.removeToken();
    expect(service.getToken()).toBe('');
  });

  it('should return userIsAuthenticated true', () => {
    service.setToken('token');
    expect(service.userIsAuthenticated()).toBeTrue();
  });

  it('should return userIsAuthenticated false', () => {
    service.removeToken();
    expect(service.userIsAuthenticated()).toBeFalse();
  });
});
