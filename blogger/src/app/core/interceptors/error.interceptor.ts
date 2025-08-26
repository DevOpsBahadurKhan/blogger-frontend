import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiConfigService } from '../services/api-config.service';
import { AuthService } from '../../features/auth/services/auth.service';

/**
 * Global HTTP error interceptor to handle API errors consistently
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private baseUrl: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiConfig: ApiConfigService
  ) {
    this.baseUrl = this.apiConfig['apiUrl'];
  }

  /**
   * Intercept HTTP responses and handle errors
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Skip error handling for authentication endpoints
        if (
          request.url.includes(this.apiConfig.loginUrl) ||
          request.url.includes(this.apiConfig.registerUrl)
        ) {
          return throwError(() => error);
        }

        let errorMessage = 'An unknown error occurred!';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case HttpStatusCode.Unauthorized:
              this.authService.logout();
              this.router.navigate(['/auth/login'], { 
                queryParams: { returnUrl: this.router.routerState.snapshot.url }
              });
              errorMessage = 'Your session has expired. Please log in again.';
              break;
              
            case HttpStatusCode.Forbidden:
              errorMessage = 'You do not have permission to perform this action.';
              break;
              
            case HttpStatusCode.NotFound:
              errorMessage = 'The requested resource was not found.';
              break;
              
            case HttpStatusCode.BadRequest:
              errorMessage = this.extractErrorMessage(error) || 'Invalid request.';
              break;
              
            case HttpStatusCode.InternalServerError:
              errorMessage = 'A server error occurred. Please try again later.';
              break;
              
            default:
              errorMessage = this.extractErrorMessage(error) || error.statusText;
          }
        }
        
        // You could also show a toast notification here
        console.error('HTTP Error:', errorMessage);
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
  /**
   * Extract error message from error response
   */
  private extractErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }
    
    if (typeof error.error === 'string') {
      try {
        const parsedError = JSON.parse(error.error);
        return parsedError.message || error.statusText;
      } catch (e) {
        return error.error;
      }
    }
    
    return error.statusText;
  }
}
