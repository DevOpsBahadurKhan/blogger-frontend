import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';

interface ContentItem {
  title: string;
  author: string;
  date: Date;
  status: 'published' | 'draft' | 'pending' | 'rejected';
  type: 'post' | 'page' | 'comment';
  views?: number;
  comments?: number;
}

@Component({
  selector: 'app-editor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule
  ],
  templateUrl: './editor-dashboard.component.html',
  styleUrls: ['./editor-dashboard.component.scss']
})
export class EditorDashboardComponent implements OnInit {
  recentContent: ContentItem[] = [];
  pendingApproval: ContentItem[] = [];
  stats = {
    totalPosts: 0,
    pendingReview: 0,
    publishedThisWeek: 0,
    commentsPending: 0
  };

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  get username(): string | null {
    const u = this.authService.currentUserValue as User;
    return u?.username || 'Editor';
  }

  private loadDashboardData() {
    // Simulated data - replace with actual API calls
    this.recentContent = [
      {
        title: 'Getting Started with Angular 15',
        author: 'John Doe',
        date: new Date('2023-05-15'),
        status: 'published',
        type: 'post',
        views: 1245,
        comments: 23
      },
      {
        title: 'Advanced TypeScript Patterns',
        author: 'Jane Smith',
        date: new Date('2023-05-14'),
        status: 'draft',
        type: 'post'
      },
      {
        title: 'About Us',
        author: 'Admin',
        date: new Date('2023-05-10'),
        status: 'published',
        type: 'page',
        views: 3421
      }
    ];

    this.pendingApproval = [
      {
        title: 'Understanding RxJS',
        author: 'Mike Johnson',
        date: new Date('2023-05-16'),
        status: 'pending',
        type: 'post'
      },
      {
        title: 'New comment on "Angular Best Practices"',
        author: 'Alex Brown',
        date: new Date('2023-05-16'),
        status: 'pending',
        type: 'comment',
        comments: 1
      }
    ];

    this.stats = {
      totalPosts: 156,
      pendingReview: 8,
      publishedThisWeek: 12,
      commentsPending: 5
    };
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'published':
        return 'status-published';
      case 'draft':
        return 'status-draft';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
