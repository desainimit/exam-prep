import { ILoginResponse, IUserDTO } from "@interfaces";
export interface IAuthService {
  register(userData: IUserDTO): Promise<IUserDTO | null>;
  login(email: string, password: string): Promise<ILoginResponse | null>;
  logout(userId: string): Promise<boolean>;
}
