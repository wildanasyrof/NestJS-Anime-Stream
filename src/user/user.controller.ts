import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest, UserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: any): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.findById(req.user.id);
    return {
      status: 'success',
      message: 'Successfully get user profile',
      data: result,
    };
  }

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
