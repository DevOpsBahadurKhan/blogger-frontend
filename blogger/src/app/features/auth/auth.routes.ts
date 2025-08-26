import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent),
    title: 'Login - BlogBuddy',
    canActivate: [AuthGuard(false)] // Only allow non-authenticated users
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component')
      .then(m => m.RegisterComponent),
    title: 'Register - BlogBuddy',
    canActivate: [AuthGuard(false)] // Only allow non-authenticated users
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
