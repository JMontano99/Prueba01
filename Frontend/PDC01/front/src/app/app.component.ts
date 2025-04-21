import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from './constants/app-config';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeSwitcherService } from './services/theme-switcher.service';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    NgIf,
    MatProgressBar,
    RouterOutlet,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    AsyncPipe,
    DatePipe,
    TranslateModule,
    RouterModule,
    MatButton,
  ],
})
export class AppComponent {
  title = 'my-app';
  now = new Date();
  isLoading: Observable<boolean>;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private matIcon: MatIconRegistry,
    private dom: DomSanitizer,
    private themeSwitcher: ThemeSwitcherService,
    private keycloakService: KeycloakService
  ) {
    this.isLoading = this.dataService.getIsLoading();

    this.setupCustomIcons();
    this.translate.setDefaultLang('es');

    this.dataService.getGeneralNotificationMessage().subscribe((msg) => {
      this.snackBar.open(msg, 'OK', {
        duration: AppConfig.generalMessageTimeout,
      });
    });
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  changeTheme(theme: string): void {
    this.themeSwitcher.loadTheme(theme);
  }

  private setupCustomIcons(): void {
    this.matIcon.addSvgIcon(
      'mex',
      this.dom.bypassSecurityTrustResourceUrl('./assets/img/lang/mex.svg')
    );
    this.matIcon.addSvgIcon(
      'usa',
      this.dom.bypassSecurityTrustResourceUrl('./assets/img/lang/usa.svg')
    );
  }

  logout() {
    this.keycloakService.logout();
  }
}
