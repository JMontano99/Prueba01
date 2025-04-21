import { Routes } from '@angular/router';
import { GuardService } from './services/guard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    canActivate: [GuardService],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'colors',
    canActivate: [GuardService],
    loadComponent: () =>
      import('./pages/colors/colors.component').then((m) => m.ColorsComponent),
  },
  {
    path: 'colors/:id',
    loadComponent: () =>
      import('./pages/colors/color-detail/color-detail.component').then(
        (m) => m.ColorDetailComponent
      ),
  },
  {
    path: 'events',
    canActivate: [GuardService],
    loadComponent: () =>
      import('./pages/events/events.component').then((m) => m.EventsComponent),
  },
  {
    path: 'users',
    canActivate: [GuardService],
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'users/:id',
    canActivate: [GuardService],
    loadComponent: () =>
      import('./pages/edit-user/edit-user.component').then(
        (m) => m.EditUserComponent
      ),
  },
  {
    path: 'create',
    canActivate: [GuardService],
    loadComponent: () =>
      import('./pages/create-user/create-user.component').then(
        (m) => m.CreateUserComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [GuardService],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
