import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if(!isAuthenticated){
    router.navigate(['/admin/auth/login']);
    return of(false);
  }

  return true;
};
