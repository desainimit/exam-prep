import { IUser } from './IUser.dto';

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}
