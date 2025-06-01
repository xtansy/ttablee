export interface IUser {
  id: string;
  username: string;
  email: string;
  age: number;
  isActive: boolean;
  lastLogin: string;
  premium: boolean;
  postsCount: number;
}

export type IUserWithoutId = Omit<IUser, "id">;
