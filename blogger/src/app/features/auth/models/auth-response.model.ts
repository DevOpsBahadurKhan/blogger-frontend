export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    roles: string[];
  };
  accessToken: string;
}
