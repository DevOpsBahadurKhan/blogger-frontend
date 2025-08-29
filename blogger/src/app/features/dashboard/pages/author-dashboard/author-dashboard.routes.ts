import { Routes } from '@angular/router';
import { AuthorDashboardComponent } from './author-dashboard.component';

export const AUTHOR_ROUTES: Routes = [
  {
    path: '',
    component: AuthorDashboardComponent,
    title: 'Author Dashboard - BlogBuddy',
    children: [
      {
        path: '',
        redirectTo: 'my-posts',
        pathMatch: 'full'
      },
      {
        path: 'my-posts',
        loadComponent: () => import('../../components/my-posts/my-posts.component')
          .then(m => m.MyPostsComponent),
        title: 'My Posts - Author Dashboard'
      },
      {
        path: 'create-post',
        loadComponent: () => import('../../components/create-post/create-post.component')
          .then(m => m.CreatePostComponent),
        title: 'Create Post - Author Dashboard'
      },
      {
        path: 'analytics',
        loadComponent: () => import('../../components/analytics/analytics.component')
          .then(m => m.AnalyticsComponent),
        title: 'Analytics - Author Dashboard'
      }
    ]
  }
];
