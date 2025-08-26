import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpInterceptorFn, provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from './features/auth/services/auth.service';
import { ApiConfigService } from './core/services/api-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Functional interceptor for authentication
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const apiConfig = inject(ApiConfigService);
  
  // Skip adding token for login and register requests
  if (req.url === apiConfig.loginUrl || req.url === apiConfig.registerUrl) {
    return next(req);
  }

  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
  
  return next(req);
};

// Functional interceptor for error handling
export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const apiConfig = inject(ApiConfigService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Skip error handling for authentication endpoints
      if (req.url.includes(apiConfig.loginUrl) || req.url.includes(apiConfig.registerUrl)) {
        return throwError(() => error);
      }

      let errorMessage = 'An unknown error occurred!';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 401: // Unauthorized
            authService.logout();
            router.navigate(['/auth/login']);
            errorMessage = 'Your session has expired. Please log in again.';
            break;
          case 403: // Forbidden
            errorMessage = 'You do not have permission to access this resource.';
            break;
          case 404: // Not Found
            errorMessage = 'The requested resource was not found.';
            break;
          case 500: // Internal Server Error
            errorMessage = 'A server error occurred. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || error.message;
        }
      }
      
      // You can add a notification service here to show error messages
      console.error('Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};

// Add FormGroup type for type safety
type FormGroup = any;

// Make sure AuthService is provided at the root level
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      CoreModule,
      ReactiveFormsModule,
      // Material Modules
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule
    ),
    // Explicitly provide AuthService at the root level
    { provide: AuthService, useClass: AuthService },
    provideAnimations(),
    provideAnimationsAsync()
  ]
};