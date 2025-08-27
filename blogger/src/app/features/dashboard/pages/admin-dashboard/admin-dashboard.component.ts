import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../auth/models/user.model';

interface DashboardStat {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}

interface DashboardCard {
  title: string;
  icon: string;
  description: string;
  link: string;
  color?: string;
}

@Component({
  selector: 'app-admin-dashboard',
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
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStat[] = [];
  adminCards: DashboardCard[] = [];

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

  private initializeDashboard() {
    // Admin specific stats
    this.stats = [
      { label: 'Total Users', value: 42, icon: 'people', color: '#3f51b5' },
      { label: 'Active Users', value: 38, icon: 'person', color: '#4caf50' },
      { label: 'Total Posts', value: 156, icon: 'article', color: '#9c27b0' },
      { label: 'Pending Moderation', value: 8, icon: 'gavel', color: '#ff9800' },
      { label: 'Comments Today', value: 23, icon: 'comment', color: '#2196f3' }
    ];

    // Admin specific cards
    this.adminCards = [
      {
        title: 'User Management',
        icon: 'admin_panel_settings',
        description: 'Manage user accounts and permissions',
        link: '/admin/users',
        color: '#3f51b5'
      },
      {
        title: 'Site Analytics',
        icon: 'analytics',
        description: 'View detailed site statistics and reports',
        link: '/admin/analytics',
        color: '#4caf50'
      },
      {
        title: 'System Settings',
        icon: 'settings',
        description: 'Configure system settings and preferences',
        link: '/admin/settings',
        color: '#ff9800'
      },
      {
        title: 'Content Moderation',
        icon: 'gavel',
        description: 'Review and moderate user content',
        link: '/admin/moderation',
        color: '#f44336'
      },
      {
        title: 'Email Templates',
        icon: 'email',
        description: 'Manage email notifications and templates',
        link: '/admin/emails',
        color: '#9c27b0'
      },
      {
        title: 'Backup & Restore',
        icon: 'backup',
        description: 'Manage system backups and restores',
        link: '/admin/backup',
        color: '#607d8b'
      }
    ];
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
