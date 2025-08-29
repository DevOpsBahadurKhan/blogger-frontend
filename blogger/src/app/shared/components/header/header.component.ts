import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../features/auth/models/user.model';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isMobileView = false;
  private routerSubscription: Subscription;
  private currentUrl: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { 
    this.checkViewport();
    
    // Close mobile menu on route change
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const e = event as NavigationEnd;
      this.currentUrl = e.urlAfterRedirects || e.url;
      if (this.isMobileView) {
        this.isMenuOpen = false;
      }
    });
  }

  ngOnInit(): void {
    this.checkViewport();
    // initialize current url
    this.currentUrl = this.router.url;
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewport();
  }

  private checkViewport() {
    this.isMobileView = window.innerWidth < 768;
    if (!this.isMobileView) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  get currentUser(): User | null {

    return this.authService.currentUserValue;
  }

  get userInitials(): string {
    const username = (this.currentUser as any)?.username ?? (this.currentUser as any)?.user?.username;
    if (!username) return 'U';
    return username
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Show logout only on dashboard when authenticated; hide on home
  get showLogout(): boolean {
    if (!this.isAuthenticated) return false;
    return this.currentUrl?.startsWith('/dashboard');
  }
}
