import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/pages/home-page/home-page.component')
      .then(m => m.HomePageComponent),
    title: 'Home - BlogBuddy'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page.component')
      .then(m => m.DashboardPageComponent),
    title: 'Dashboard - BlogBuddy',
    canActivate: [AuthGuard(true)]
  },
  {
    path: 'blogs',
    loadComponent: () => import('./features/blogs/pages/blogs-page/blogs-page.component')
      .then(m => m.BlogsPageComponent),
    title: 'Blogs - BlogBuddy'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
      .then(m => m.AUTH_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
