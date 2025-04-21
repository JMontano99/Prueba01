import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { LoggerManagerService } from './logger-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ConsumeService {
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private loggerService: LoggerManagerService
  ) {}

  httpGet<T>(
    url: string,
    params?: Record<string, string>,
    headers?: Record<string, string | string[]>
  ): Observable<T> {
    let objHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        objHeaders = objHeaders.append(key, headers[key]);
      });
    }

    let objParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        objParams = objParams.append(key, params[key]);
      });
    }

    this.dataService.setIsLoading(true);
    return new Observable<T>((observer) => {
      this.http
        .get<T>(url, { headers: objHeaders, params: objParams })
        .subscribe({
          next: (response) => {
            this.returnResponse(observer, response);
          },
          error: (err) => {
            this.returnError(observer, err);
          },
        });
    });
  }

  httpDelete<T>(
    url: string,
    params?: Record<string, string>,
    headers?: Record<string, string | string[]>
  ): Observable<T> {
    let objHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        objHeaders = objHeaders.append(key, headers[key]);
      });
    }

    let objParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        objParams = objParams.append(key, params[key]);
      });
    }

    this.dataService.setIsLoading(true);
    return new Observable<T>((observer) => {
      this.http
        .delete<T>(url, { headers: objHeaders, params: objParams })
        .subscribe({
          next: (response) => {
            this.returnResponse(observer, response);
          },
          error: (err) => {
            this.returnError(observer, err);
          },
        });
    });
  }

  httpPost<T>(
    url: string,
    body: object,
    headers?: Record<string, string | string[]>
  ): Observable<T> {
    let objHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        objHeaders = objHeaders.append(key, headers[key]);
      });
    }

    this.dataService.setIsLoading(true);
    return new Observable<T>((observer) => {
      this.http.post<T>(url, body, { headers: objHeaders }).subscribe({
        next: (response) => {
          this.returnResponse(observer, response);
        },
        error: (err) => {
          this.returnError(observer, err);
        },
      });
    });
  }

  httpPut<T>(
    url: string,
    body: object,
    headers?: Record<string, string | string[]>
  ): Observable<T> {
    let objHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        objHeaders = objHeaders.append(key, headers[key]);
      });
    }

    this.dataService.setIsLoading(true);
    return new Observable<T>((observer) => {
      this.http.put<T>(url, body, { headers: objHeaders }).subscribe({
        next: (response) => {
          this.returnResponse(observer, response);
        },
        error: (err) => {
          this.returnError(observer, err);
        },
      });
    });
  }

  private returnResponse<T>(observer: Subscriber<T>, response: T): void {
    observer.next(response);
    observer.complete();
    this.dataService.setIsLoading(false);
  }

  private returnError<T>(observer: Subscriber<T>, error: Error): void {
    observer.error(error);
    this.loggerService.exception(error.message, true);
    this.dataService.setIsLoading(false);
  }
}
