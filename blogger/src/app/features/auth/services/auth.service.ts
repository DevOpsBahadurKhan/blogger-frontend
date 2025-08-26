import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
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

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.apiConfig.loginUrl, { email, password })
      .pipe(map((res: AuthResponse) => {
        const user = res.user;
        const token = res.accessToken;
        // Store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.currentUserSubject.next(user);
        return user;
      }));
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

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
