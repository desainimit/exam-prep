import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@core/interceptors/base-url.interceptor';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { IUser } from '@core/models/interfaces/dtos/IUser.dto';
import { ILoginResponse } from '@core/models/interfaces/dtos/ILoginResponse.dto';
import { IAuthService } from '@core/models/interfaces/services/IAuthServices';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  loggedUser: any;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private ngxPermissionService: NgxPermissionsService,
    @Inject(API_URL) private apiUrl: string
  ) {}

  registerUser(user: IUser): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/register', user, {
      withCredentials: true,
    });
  }

  login(user: IUser): Observable<ILoginResponse> {
    return this.http
      .post(this.apiUrl + '/auth/login', user, {
        withCredentials: true,
      })
      .pipe(
        tap((res: any) => {
          const user = res.data.user;
          this.tokenService.setUserData(user);
          this.tokenService.setToken('accessToken', res.data.accessToken);

          this.ngxPermissionService.loadPermissions(user.role);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(this.apiUrl + '/auth/logout', {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.tokenService.clearToken('accessToken');
          this.ngxPermissionService.flushPermissions();
        })
      );
  }

  getRolePermissions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + '/user/role-permissions', null, {
          withCredentials: true,
        })
        .subscribe({
          next: (res: any) => {
            if (res.status) {
              const permissions = res.data.permissions;

              this.ngxPermissionService.loadPermissions(permissions);
              resolve(res);
            }
          },
          error: () => {
            reject();
          },
        })
        .add(() => {
          this.loggedUser = this.tokenService.getUserData();
        });
    });
  }
}
