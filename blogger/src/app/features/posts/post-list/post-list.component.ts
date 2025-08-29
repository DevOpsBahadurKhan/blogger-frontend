import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  User: {
    id: number;
    username: string;
    email: string;
  };
}

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {



  posts: Post[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>('http://localhost:3000/api/posts').subscribe({
      next: (response) => {
        console.log('API Response:', response);
        // Handle different response formats
        if (Array.isArray(response)) {
          this.posts = response;
        } else if (response && Array.isArray(response.data)) {
          // Handle case where response is { data: Post[] }
          this.posts = response.data;
        } else if (response && response.posts && Array.isArray(response.posts)) {
          // Handle case where response is { posts: Post[] }
          this.posts = response.posts;
        } else {
          console.warn('Unexpected API response format:', response);
        }
      },
      error: (error) => {
        console.error('Error loading posts:', error);
      }
    });
  }



}
