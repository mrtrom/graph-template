export interface UserInput {
  username: string;
  password: string;
}

export interface UserOutput {
  token: string;
  user: User;
}

export interface User {
  id?: number;
  username?: string;
  pasword?: string;
  name?: string;
  status?: string;
}