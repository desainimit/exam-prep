export interface IUserDTO {
  _id?: string;
  username: string;
  fullName: string;
  email: string;
  password?: string;
  isLoggedIn?: boolean;
  role?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;

  // Extra fields
  accessToken?: string;
}
