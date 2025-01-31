import { UserResponse } from './user.model';

export class LoginRequest {
  email: string;
  password: string;
}

export class AuthResponse {
  accessToken: string;
  user: UserResponse;
}

export class RegisterRequest {
  email: string;
  password: string;
}
