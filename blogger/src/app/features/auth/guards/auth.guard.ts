import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard factory function that returns a CanActivateFn
 * @param requireAuth If true, requires user to be authenticated. If false, requires user to be unauthenticated.
 */
export const AuthGuard = (requireAuth: boolean = true): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    // If the route requires authentication but user is not authenticated
    if (requireAuth && !authService.isAuthenticated) {
      router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: state.url } 
      });
      return false;
    }
    
    // If the route requires user to be unauthenticated but user is authenticated
    if (!requireAuth && authService.isAuthenticated) {
      console.log('AuthGuard: User is authenticated, checking roles...');
      const user = authService.currentUserValue;
      console.log('Current user:', user);
      
      if (user?.roles) {
        console.log('User roles:', user.roles);
        if (user.roles.includes('admin')) {
          console.log('Redirecting to admin dashboard');
          router.navigate(['/admin']);
        } else if (user.roles.includes('author')) {
          console.log('Redirecting to author dashboard');
          router.navigate(['/author']);
        } else if (user.roles.includes('editor')) {
          console.log('Redirecting to editor dashboard');
          router.navigate(['/editor']);
        } else {
          console.log('No matching role, redirecting to home');
          router.navigate(['/']);
        }
      } else {
        console.log('No roles found for user, redirecting to home');
        router.navigate(['/home']);
      }
      return false;
    }
    
    // Check role-based access if roles are specified
    if (requireAuth && route.data && route.data['roles']) {
      const requiredRoles = route.data['roles'] as string[];
      
      if (!authService.hasAnyRole(requiredRoles)) {
        // Redirect to unauthorized or home if user doesn't have required role
        router.navigate(['/unauthorized']);
        return false;
      }
    }
    
    return true;
  };
};
