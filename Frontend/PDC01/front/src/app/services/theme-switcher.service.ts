import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  currentTheme: BehaviorSubject<string> = new BehaviorSubject<string>('light');

  constructor() {
    this.loadTheme();
  }

  loadTheme(theme: string = environment.theme): void {
    this.insertToDOM(theme);
  }

  insertToDOM = (theme: string) => {
    const documentElement = document.documentElement;
    const current = Array.from(documentElement.classList).find((x) =>
      x.includes('-theme')
    );
    if (current) {
      documentElement.classList.remove(current);
    }
    documentElement.classList.add(theme);
    this.currentTheme.next(theme.replace('-theme', ''));
  };

  getCurrentTheme() {
    return this.currentTheme.asObservable();
  }
}
