import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest, UserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() request: CreateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.create(request);
    return {
      status: 'success',
      message: 'Episode created successfully',
      data: result,
    };
  }
}
