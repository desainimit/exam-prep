import { IUserDTO } from "./IUser.dto";

export interface ILoginResponse {
  user: IUserDTO;
  accessToken: string;
}
