import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LogService {
  public static log(data?: unknown) {
    if (!environment.production) {
      console.log(data);
    }
  }

  public static warning(data?: unknown) {
    if (!environment.production) {
      console.warn(data);
    }
  }

  public static error(data?: unknown) {
    if (!environment.production) {
      console.error(data);
    }
  }

  public static trace(data?: unknown) {
    if (!environment.production) {
      console.trace(data);
    }
  }
}
