import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blogs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="blogs-page">
      <div class="header">
        <h2>
          <mat-icon>rss_feed</mat-icon>
          Blogs
        </h2>
        <div class="actions">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search posts</mat-label>
            <input matInput placeholder="Search by title or author" [(ngModel)]="search" />
            <button *ngIf="search" matSuffix mat-icon-button aria-label="Clear" (click)="search=''">
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
        </div>
      </div>

      <div *ngIf="loading" class="loading">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="!loading" class="cards" data-testid="blog-cards">
        <mat-card *ngFor="let b of filteredBlogs; trackBy: trackById" class="blog-card">
          <mat-card-header>
            <div mat-card-avatar class="avatar">
              {{ (b.author?.username || 'U')[0] | uppercase }}
            </div>
            <mat-card-title>{{ b.title }}</mat-card-title>
            <mat-card-subtitle>
              by {{ b.author?.username || 'Unknown' }} · {{ b.createdAt | date:'mediumDate' }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="excerpt">{{ b.content || '' | slice:0:180 }}<span *ngIf="(b.content||'').length>180">...</span></p>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button color="primary" [routerLink]="['/blogs', b.id]">
              <mat-icon>open_in_new</mat-icon>
              Read more
            </a>
          </mat-card-actions>
        </mat-card>
      </div>

      <div *ngIf="!loading && !filteredBlogs.length" class="empty">
        <mat-icon>hourglass_empty</mat-icon>
        <span>No posts found.</span>
      </div>
    </div>
  `,
  styleUrls: ['./blogs-page.component.scss']
})
export class BlogsPageComponent {
  blogs: Blog[] = [];
  loading = true;
  error = '';
  search = '';

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogsService.list().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load blogs';
        this.loading = false;
      }
    });
  }

  get filteredBlogs(): Blog[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.blogs;
    return this.blogs.filter(b =>
      (b.title || '').toLowerCase().includes(q) ||
      (b.author?.username || '').toLowerCase().includes(q)
    );
  }

  trackById(_index: number, item: Blog) { return item.id; }
}
