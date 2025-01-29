import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/model/user.model';
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

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req: any): Promise<WebResponse<UserResponse>> {
    const reqBody = req.body as UpdateUserRequest;
    const result = await this.userService.updateProfile(req.user.id, reqBody);
    return {
      status: 'success',
      message: 'Successfully update user profile',
      data: result,
    };
  }
}
