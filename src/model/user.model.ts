export class CreateUserRequest {
  username?: string;
  email: string;
  password: string;
}

export class UpdateUserRequest {
  username?: string;
  email?: string;
  lastPasword?: string;
  newPassword?: string;
}

export class UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
}

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
