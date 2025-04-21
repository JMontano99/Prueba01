export interface Logger {
  exception(exceptionMessage: string, isFatal: boolean): void;
  event(name: string): void;
}
