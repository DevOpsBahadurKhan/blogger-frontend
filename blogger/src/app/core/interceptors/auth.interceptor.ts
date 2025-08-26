import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { ApiConfigService } from '../services/api-config.service';

/**
 * Interceptor to add authorization token to outgoing HTTP requests
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private apiConfig: ApiConfigService
  ) {}

  /**
   * Intercept HTTP requests and add the authorization token
   * @param request The outgoing request object to handle
   * @param next The next interceptor in the chain
   * @returns An observable of the HTTP event stream
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip adding token for login and register requests
    if (
      request.url === this.apiConfig.loginUrl || 
      request.url === this.apiConfig.registerUrl
    ) {
      return next.handle(request);
    }

    const token = this.authService.getToken();
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    }
    
    return next.handle(request);
  }
}
