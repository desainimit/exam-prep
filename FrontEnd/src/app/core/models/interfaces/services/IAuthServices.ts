import { Observable } from 'rxjs';
import { IUser } from '../dtos/IUser.dto';
import { ILoginResponse } from '../dtos/ILoginResponse.dto';

export interface IAuthService {
  registerUser(user: IUser): Observable<any>;
  login(user: IUser): Observable<ILoginResponse>;
  logout(): Observable<any>;
  getRolePermissions(): Promise<void>;
}
