import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@app/core/services/toast.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MESSAGE } from '@app/utils/Messages';
import { TokenService } from '@app/core/services/token.service';
import { Router } from '@angular/router';

let serverConnectionError: boolean = false;

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const redirectToLoginMessages = [
    'Please login to continue',
    'Access denied. No token provided',
  ];
  // Block the request if a server connection error has already occurred
  if (serverConnectionError) {
    return throwError(() => new Error(MESSAGE.SERVER_ERROR));
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<any> => {
      console.log('error', error);

      if (error.status === 0) {
        toastService.showError(MESSAGE.SERVER_CONNECTION_ERROR);
        serverConnectionError = true;
      } else {
        const errorMessage = error.error?.message || MESSAGE.SERVER_ERROR;
        toastService.showError(errorMessage);

        if (redirectToLoginMessages.includes(errorMessage)) {
          tokenService.clearToken('accessToken');
          router.navigate(['/auth/login']);
        }
      }
      return throwError(() => new Error(error.message));
    })
  );
};
