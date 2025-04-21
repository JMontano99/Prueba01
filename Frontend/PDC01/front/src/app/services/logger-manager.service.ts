import { Logger } from '../model/device/logger.model';
import { LoggerStrategies } from '../constants/logger';
import { GoogleLoggerStrategy } from './google-logger.service';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

export class LoggerManagerService implements Logger {
  private logger: Logger;
  constructor(
    private analyticsService: AngularFireAnalytics,
    private strategy: LoggerStrategies = LoggerStrategies.GOOGLE
  ) {
    const dictStrategys: Record<string, Logger> = {
      GoogleStrategy: new GoogleLoggerStrategy(this.analyticsService),
    };
    this.logger = dictStrategys[this.strategy];
  }

  exception(exceptionMessage: string, isFatal: boolean): void {
    this.logger.exception(exceptionMessage, isFatal);
  }
  event(name: string): void {
    this.logger.event(name);
  }
}
