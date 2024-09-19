export type AuthResponse = {
  success: boolean;
  message?: string;
  token?: string;
  refreshToken?: string;
  user?: UserResponse;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  surname: string;
  workspace: string;
  avatar?: string;
};

export type UserResponse = User & {
  token?: string;
  refreshToken?: string;
};
