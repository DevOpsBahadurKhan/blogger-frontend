import { Injectable, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiConfigService } from '../services/api-config.service';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private authService = inject(AuthService);
  private apiConfig = inject(ApiConfigService);

  private baseUrl: string = this.apiConfig['apiUrl'];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
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
          if (error.status === 0) {
            errorMessage = 'Network error: Unable to reach the server.';
          } else {
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
        }

        this.showError(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }

    if (typeof error.error === 'string') {
      try {
        const parsedError = JSON.parse(error.error);
        return parsedError.message || error.statusText;
      } catch {
        return error.error;
      }
    }

    return error.statusText;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
