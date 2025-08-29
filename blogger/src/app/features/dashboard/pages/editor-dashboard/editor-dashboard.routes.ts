import { Routes } from '@angular/router';
import { EditorDashboardComponent } from './editor-dashboard.component';

export const EDITOR_ROUTES: Routes = [
  {
    path: '',
    component: EditorDashboardComponent,
    title: 'Editor Dashboard - BlogBuddy',
    children: [
      {
        path: '',
        redirectTo: 'review',
        pathMatch: 'full'
      },
      {
        path: 'review',
        loadComponent: () => import('../../components/review-posts/review-posts.component.js')
          .then(m => m.ReviewPostsComponent),
        title: 'Review Posts - Editor Dashboard'
      },
      {
        path: 'published',
        loadComponent: () => import('../../components/published-posts/published-posts.component.js')
          .then(m => m.PublishedPostsComponent),
        title: 'Published Posts - Editor Dashboard'
      },
      {
        path: 'categories',
        loadComponent: () => import('../../components/manage-categories/manage-categories.component.js')
          .then(m => m.ManageCategoriesComponent),
        title: 'Manage Categories - Editor Dashboard'
      }
    ]
  }
];
