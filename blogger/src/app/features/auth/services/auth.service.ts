import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { ApiConfigService } from '../../../core/services/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {
    // Normalize/migrate stored user shape
    const raw = localStorage.getItem('currentUser');
    let initialUser: User | null = null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // If old shape { user, accessToken } was stored by mistake, migrate it
        if (parsed && parsed.user && parsed.accessToken) {
          initialUser = parsed.user as User;
          localStorage.setItem('currentUser', JSON.stringify(initialUser));
          localStorage.setItem('token', parsed.accessToken as string);
        } else {
          initialUser = parsed as User;
        }
      } catch {
        initialUser = null;
      }
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    // Only return true if we have a token and a user in local storage
    // The actual token validation will be done by the server on each request
    return !!this.getToken() && !!this.currentUserValue;
  }

  public hasRole(role: string): boolean {
    return this.currentUserValue?.roles?.includes(role) || false;
  }

  public hasAnyRole(roles: string[]): boolean {
    if (!this.currentUserValue?.roles) return false;
    return roles.some(role => this.currentUserValue?.roles?.includes(role));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.apiConfig.loginUrl, { email, password })
      .pipe(
        map((res: AuthResponse) => {
          if (!res || !res.user || !res.accessToken) {
            throw new Error('Invalid response from server');
          }
          
          const user = res.user;
          const token = res.accessToken;
          
          // Only store if we have valid data
          if (user && token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', token);
            this.currentUserSubject.next(user);
            return res;
          }
          
          throw new Error('Authentication failed');
        }),
        catchError(error => {
          // Clear any existing auth data on error
          this.logout();
          return throwError(() => error);
        })
      );
  }

  register(user: { name: string; email: string; password: string }) {
    return this.http.post<User>(this.apiConfig.registerUrl, user);
  }

  logout() {
    // Remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
