import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { GoogleLogEvents } from '../constants/logger';
import { Logger } from '../model/device/logger.model';

export class GoogleLoggerStrategy implements Logger {
  constructor(private analyticsService: AngularFireAnalytics) {}

  exception(error: string, isFatal: boolean): void {
    this.analyticsService.logEvent(GoogleLogEvents.exception, {
      exDescription: error.substring(0, 149),
      exFatal: isFatal,
    });
  }

  event(name: string): void {
    this.analyticsService.logEvent(name);
  }
}
