import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const role = tokenService.getRole();
  const router = inject(Router);

  if (route.data['roles'].includes(role)) {
    return true;
  } else {
    router.navigate(['/notFound']);
    return false;
  }
};
