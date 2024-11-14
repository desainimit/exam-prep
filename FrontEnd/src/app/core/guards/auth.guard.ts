import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@core/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isTokenAvailable('accessToken')) {
    return true;
  } else {
    if (state.url !== '/auth/login') {
      tokenService.clearToken('accessToken');
      router.navigate(['/auth/login']);
    }
    return false;
  }
};
