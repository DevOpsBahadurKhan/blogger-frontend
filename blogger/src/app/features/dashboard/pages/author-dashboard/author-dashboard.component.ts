import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../auth/models/user.model';

interface BlogPost {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'pending' | 'scheduled';
  publishDate: Date;
  views: number;
  comments: number;
  likes: number;
  readingTime: string;
  thumbnail?: string;
}

interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  change?: number;
}

@Component({
  selector: 'app-author-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.scss']
})
export class AuthorDashboardComponent implements OnInit {
  recentPosts: BlogPost[] = [];
  stats: StatCard[] = [];
  drafts: BlogPost[] = [];
  scheduled: BlogPost[] = [];
  
  // Analytics data
  viewsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1900, 1500, 2500, 2200, 3000],
    color: '#3f51b5'
  };

  // Reading stats
  readingStats = {
    avgTime: '2 min',
    completionRate: 65,
    popularTime: '10:00 AM',
    popularDay: 'Wednesday'
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
    return u?.username || 'Author';
  }

  private loadDashboardData() {
    // Simulated data - replace with actual API calls
    this.recentPosts = [
      {
        id: '1',
        title: 'Getting Started with Angular 15',
        status: 'published',
        publishDate: new Date('2023-05-15'),
        views: 1245,
        comments: 23,
        likes: 89,
        readingTime: '5 min',
        thumbnail: 'assets/angular-cover.jpg'
      },
      {
        id: '2',
        title: 'Advanced TypeScript Patterns',
        status: 'published',
        publishDate: new Date('2023-05-10'),
        views: 890,
        comments: 12,
        likes: 45,
        readingTime: '8 min',
        thumbnail: 'assets/typescript-cover.jpg'
      }
    ];

    this.drafts = [
      {
        id: '3',
        title: 'Understanding RxJS Operators',
        status: 'draft',
        publishDate: new Date(),
        views: 0,
        comments: 0,
        likes: 0,
        readingTime: '6 min'
      }
    ];

    this.scheduled = [
      {
        id: '4',
        title: 'Angular Performance Optimization',
        status: 'scheduled',
        publishDate: new Date('2023-05-20'),
        views: 0,
        comments: 0,
        likes: 0,
        readingTime: '7 min'
      }
    ];

    this.stats = [
      {
        title: 'Total Posts',
        value: 24,
        icon: 'article',
        color: '#3f51b5',
        change: 12
      },
      {
        title: 'Monthly Views',
        value: '12.4K',
        icon: 'visibility',
        color: '#4caf50',
        change: 24
      },
      {
        title: 'Engagement',
        value: '1.2K',
        icon: 'thumb_up',
        color: '#ff9800',
        change: -5
      },
      {
        title: 'Avg. Reading Time',
        value: '3.2 min',
        icon: 'schedule',
        color: '#9c27b0',
        change: 8
      }
    ];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'published':
        return 'status-published';
      case 'draft':
        return 'status-draft';
      case 'pending':
        return 'status-pending';
      case 'scheduled':
        return 'status-scheduled';
      default:
        return '';
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getProgressColor(percentage: number): string {
    if (percentage > 70) return 'primary';
    if (percentage > 40) return 'accent';
    return 'warn';
  }
}
