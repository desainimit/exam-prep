export interface IUser {
  username: string;
  fullName: string;
  email: string;
  password?: string;
  isLoggedIn?: boolean;
  roleId?: string;
  profileImage?: string;
  role?: string;
}
