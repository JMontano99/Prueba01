import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private isLoading = new Subject<boolean>();
  private generalNotificationMessage = new Subject<string>();

  setIsLoading(loading: boolean): void {
    this.isLoading.next(loading);
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  getGeneralNotificationMessage(): Observable<string> {
    return this.generalNotificationMessage.asObservable();
  }

  setGeneralNotificationMessage(msg: string): void {
    this.generalNotificationMessage.next(msg);
  }

  getToken(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
  }

  userIsAuthenticated(): boolean {
    return Boolean(sessionStorage.getItem('token'));
  }
}
