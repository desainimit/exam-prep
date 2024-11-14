import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@core/services/token.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isTokenAvailable('accessToken')) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
