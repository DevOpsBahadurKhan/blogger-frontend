import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard - BlogBuddy',
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('../../components/overview/overview.component')
          .then(m => m.OverviewComponent),
        title: 'Overview - Admin Dashboard'
      },
      {
        path: 'users',
        loadComponent: () => import('../../components/users/users.component')
          .then(m => m.UsersComponent),
        title: 'Users - Admin Dashboard'
      },
      {
        path: 'settings',
        loadComponent: () => import('../../components/settings/settings.component')
          .then(m => m.SettingsComponent),
        title: 'Settings - Admin Dashboard'
      }
    ]
  }
];
