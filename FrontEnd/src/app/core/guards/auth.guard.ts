import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@core/services/token.service';
import { WebsocketService } from '@core/services/websocket.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const websocketService = inject(WebsocketService);
  const router = inject(Router);
  if (tokenService.isTokenAvailable('accessToken')) {
    return true;
  } else {
    if (state.url !== '/auth/login') {
      tokenService.clearToken('accessToken');
      router.navigate(['/auth/login']);
    }
    websocketService.close();
    return false;
  }
};
