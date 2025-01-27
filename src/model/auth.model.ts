export class LoginRequest {
  email: string;
  password: string;
}

export class LoginResponse {
  token: string;
}

export class RegisterRequest {
  email: string;
  password: string;
}
