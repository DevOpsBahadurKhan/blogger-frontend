import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';

interface DashboardStat {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  roles?: string[]; // If specified, only show for these roles
}

interface DashboardCard {
  title: string;
  icon: string;
  description: string;
  link?: string;
  roles?: string[];
  action?: () => void;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  stats: DashboardStat[] = [];
  quickActions: DashboardCard[] = [];
  adminCards: DashboardCard[] = [];
  editorCards: DashboardCard[] = [];
  authorCards: DashboardCard[] = [];
  readerCards: DashboardCard[] = [];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeDashboard();
  }

  get username(): string | null {
    const u = this.authService.currentUserValue as User;
    return u?.username ?? null;
  }

  get roles(): string[] {
    const u = this.authService.currentUserValue as User;
    return u?.roles || [];
  }

  hasAnyRole(requiredRoles: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return this.roles.some(role => requiredRoles.includes(role));
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  private initializeDashboard() {
    // Common stats for all roles
    this.stats = [
      { label: 'Total Posts', value: 42, icon: 'article', color: '#3f51b5' },
      { 
        label: 'Your Posts', 
        value: this.hasRole('reader') ? 'N/A' : 8, 
        icon: 'post_add', 
        color: '#4caf50',
        roles: ['author', 'editor', 'admin'] 
      },
      { 
        label: 'Drafts', 
        value: this.hasRole('reader') ? 'N/A' : 3, 
        icon: 'drafts', 
        color: '#ff9800',
        roles: ['author', 'editor', 'admin'] 
      },
      { label: 'Comments', value: 12, icon: 'chat_bubble', color: '#9c27b0' },
      { 
        label: 'Users', 
        value: 5, 
        icon: 'group', 
        color: '#009688',
        roles: ['admin', 'editor'] 
      }
    ];

    // Quick Actions
    this.quickActions = [
      {
        title: 'New Post',
        icon: 'add_circle',
        description: 'Create a new blog post',
        link: '/posts/new',
        roles: ['author', 'editor', 'admin']
      },
      {
        title: 'View Posts',
        icon: 'list_alt',
        description: 'Browse all blog posts',
        link: '/posts'
      },
      {
        title: 'Your Profile',
        icon: 'person',
        description: 'Update your profile information',
        link: '/profile'
      }
    ];

    // Admin specific cards
    this.adminCards = [
      {
        title: 'User Management',
        icon: 'admin_panel_settings',
        description: 'Manage user accounts and permissions',
        link: '/admin/users'
      },
      {
        title: 'Site Analytics',
        icon: 'analytics',
        description: 'View site statistics and analytics',
        link: '/admin/analytics'
      },
      {
        title: 'System Settings',
        icon: 'settings',
        description: 'Configure system settings',
        link: '/admin/settings'
      }
    ];

    // Editor specific cards
    this.editorCards = [
      {
        title: 'Content Moderation',
        icon: 'rate_review',
        description: 'Review and moderate content',
        link: '/moderate'
      },
      {
        title: 'Categories & Tags',
        icon: 'category',
        description: 'Manage post categories and tags',
        link: '/categories'
      }
    ];

    // Author specific cards
    this.authorCards = [
      {
        title: 'Your Drafts',
        icon: 'drafts',
        description: 'Continue working on your drafts',
        link: '/posts?status=draft'
      },
      {
        title: 'Post Analytics',
        icon: 'insights',
        description: 'View your post performance',
        link: '/analytics/author'
      }
    ];

    // Reader specific cards
    this.readerCards = [
      {
        title: 'Saved Articles',
        icon: 'bookmark',
        description: 'View your saved articles',
        link: '/saved'
      },
      {
        title: 'Reading History',
        icon: 'history',
        description: 'Your reading history',
        link: '/history'
      }
    ];
  }
}
