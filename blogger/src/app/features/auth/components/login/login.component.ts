import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    // Material Modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect to appropriate dashboard based on user role if already logged in
    if (this.authService.currentUserValue) {
      const user = this.authService.currentUserValue;
      if (user.roles.includes('admin')) {
        this.router.navigate(['/admin']);
      } else if (user.roles.includes('author')) {
        this.router.navigate(['/author']);
      } else if (user.roles.includes('editor')) {
        this.router.navigate(['/editor']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Get return url from route parameters or default to appropriate dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 
      (this.authService.currentUserValue?.roles?.includes('admin') ? '/admin' : 
       this.authService.currentUserValue?.roles?.includes('author') ? '/author' : 
       this.authService.currentUserValue?.roles?.includes('editor') ? '/editor' : '/');
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.group('LoginComponent.onSubmit()');
    console.log('Login form submitted');
    this.submitted = true;

    // Reset error on new submission
    this.error = '';

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('❌ Form is invalid');
      console.groupEnd();
      return;
    }

    this.loading = true;
    console.log('🔑 Calling authService.login with email:', this.f['email'].value);
    
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (response: AuthResponse) => {
          console.log('✅ Login successful');
          // Let AuthGuard handle the redirection
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          console.groupEnd();
        },
        error: (error: any) => {
          console.error('❌ Login error:', error);
          this.error = error;
          this.loading = false;
          console.groupEnd();
        }
      });
  }

  private redirectBasedOnRole(roles: string[]) {
    console.log('🔍 Determining redirect based on roles:', roles);
    
    // Check roles in order of priority: admin > author > editor > default
    if (roles.includes('admin')) {
      console.log('👑 User is admin, navigating to /admin');
      this.router.navigate(['/admin'])
        .then(navResult => {
          console.log('Admin navigation result:', navResult ? 'Success' : 'Failed');
          if (!navResult) {
            console.error('❌ Failed to navigate to /admin');
            this.router.navigate(['/']);
          }
        });
    } else if (roles.includes('author')) {
      console.log('✍️ User is author, navigating to /author');
      this.router.navigate(['/author'])
        .then(navResult => {
          console.log('Author navigation result:', navResult ? 'Success' : 'Failed');
          if (!navResult) {
            console.error('❌ Failed to navigate to /author');
            this.router.navigate(['/']);
          }
        });
    } else if (roles.includes('editor')) {
      console.log('📝 User is editor, navigating to /editor');
      this.router.navigate(['/editor'])
        .then(navResult => {
          console.log('Editor navigation result:', navResult ? 'Success' : 'Failed');
          if (!navResult) {
            console.error('❌ Failed to navigate to /editor');
            this.router.navigate(['/']);
          }
        });
    } else {
      console.log('👤 No specific role, redirecting to home');
      this.router.navigate(['/'])
        .then(navResult => {
          console.log('Home navigation result:', navResult ? 'Success' : 'Failed');
          if (!navResult) console.error('❌ Failed to navigate to home');
        });
    }
  }
  }

