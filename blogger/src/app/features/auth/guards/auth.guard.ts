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
    
    const currentUser = authService.currentUserValue;
    const isAuthenticated = !!currentUser;
    
    // If the route requires authentication but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
    // If the route requires user to be unauthenticated but user is authenticated
    if (!requireAuth && isAuthenticated) {
      router.navigate(['/home']);
      return false;
    }
    
    // Check role-based access if roles are specified
    if (requireAuth && route.data && route.data['roles'] && currentUser) {
      const hasRequiredRole = route.data['roles'].some((role: string) => 
        currentUser.roles?.includes(role)
      );
      
      if (!hasRequiredRole) {
        router.navigate(['/home']);
        return false;
      }
    }
    
    return true;
  };
};
