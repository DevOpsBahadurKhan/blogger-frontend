import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  // Public routes
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
    path: 'blogs',
    loadComponent: () => import('./features/blogs/pages/blogs-page/blogs-page.component')
      .then(m => m.BlogsPageComponent),
    title: 'Blogs - BlogBuddy'
  },

  {
    path: 'posts',
    loadChildren: () => import('./features/posts/posts-routing.module')
      .then(m => m.PostsRoutingModule),
    title: 'Posts - BlogBuddy'
  },

  // Auth routes (only for unauthenticated users)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
      .then(m => m.AUTH_ROUTES),
    canActivate: [AuthGuard(false)]
  },

  // Protected routes (require authentication)
  {
    path: 'admin',
    canActivate: [AuthGuard(true)],
    data: { roles: ['admin'] },
    loadChildren: () => import('./features/dashboard/pages/admin-dashboard/admin-dashboard.routes')
      .then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'author',
    canActivate: [AuthGuard(true)],
    data: { roles: ['author'] },
    loadChildren: () => import('./features/dashboard/pages/author-dashboard/author-dashboard.routes')
      .then(m => m.AUTHOR_ROUTES)
  },
  {
    path: 'editor',
    canActivate: [AuthGuard(true)],
    data: { roles: ['editor'] },
    loadChildren: () => import('./features/dashboard/pages/editor-dashboard/editor-dashboard.routes')
      .then(m => m.EDITOR_ROUTES)
  },

  // Fallback route
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
