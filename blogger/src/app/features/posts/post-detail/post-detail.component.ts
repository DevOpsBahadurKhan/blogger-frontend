import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Post {
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

@Component({
  selector: 'app-post-detail',
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
       MatToolbarModule,
       MatMenuModule,
       MatFormFieldModule,
       MatChipsModule,
       MatProgressSpinnerModule,
       MatSnackBarModule,
       RouterLink
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.fetchPost(postId);
      } else {
        this.error = 'No post ID provided';
        this.loading = false;
      }
    });
  }

  private fetchPost(postId: string): void {
    this.loading = true;
    this.error = null;

    this.http.get<Post>(`http://localhost:3000/api/posts/${postId}`).subscribe({
      next: (response: any) => {
        // Handle different response formats
        this.post = response.data || response.post || response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        this.error = 'Failed to load post. Please try again later.';
        this.loading = false;
      }
    });
  }
}
