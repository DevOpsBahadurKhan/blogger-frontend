import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  constructor(public authService: AuthService) {}

  get username(): string | null {
    const u = this.authService.currentUserValue as any;
    return u?.username ?? u?.user?.username ?? null;
  }

  get roles(): string[] {
    const u = this.authService.currentUserValue as any;
    return (u?.roles as string[]) || [];
  }

  // Placeholder admin stats (wire to API later)
  stats = [
    { label: 'Total Posts', value: 0, icon: 'article', color: '#3f51b5' },
    { label: 'Users', value: 0, icon: 'group', color: '#009688' },
    { label: 'Comments', value: 0, icon: 'chat_bubble', color: '#ff9800' },
  ];
}
