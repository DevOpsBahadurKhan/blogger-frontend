import { Component, inject } from '@angular/core';
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
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.scss']
})
export class BlogsPageComponent {
  private blogsService = inject(BlogsService);

  blogs: Blog[] = [];
  loading = true;
  error = '';
  search = '';

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

  trackById(_index: number, item: Blog) {
    return item.id;
  }
}
