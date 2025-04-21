import { TestBed } from '@angular/core/testing';

import { ThemeSwitcherService } from './theme-switcher.service';
import { Observable } from 'rxjs';

describe('ThemeSwitcherService', () => {
  let service: ThemeSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load dark theme', () => {
    const spy = spyOn(service, 'insertToDOM').and.callThrough();
    expect(service).toBeTruthy();
    service.loadTheme('dark-theme');
    expect(spy).toHaveBeenCalled();
    expect(
      document.documentElement.getAttribute('class')?.includes('dark-theme')
    ).toBeTrue();
  });

  it('should load axity theme', () => {
    const spy = spyOn(service, 'insertToDOM').and.callThrough();
    expect(service).toBeTruthy();
    service.loadTheme('axity-theme');
    expect(spy).toHaveBeenCalled();
    expect(
      document.documentElement.getAttribute('class')?.includes('axity-theme')
    ).toBeTrue();
  });

  it('should get theme observable', () => {
    const obs = service.getCurrentTheme();
    expect(obs).toBeTruthy();
    expect(obs).toBeInstanceOf(Observable<string>);
  });
});
