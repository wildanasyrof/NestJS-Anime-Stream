import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { CreateUserRequest, User, UserResponse } from 'src/model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from 'src/model/auth.model';

@Injectable()
export class UserService {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'User not found',
          errors: `User with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async login(request: LoginRequest): Promise<User> {
    const dataRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    const user = await this.findByEmail(dataRequest.email);

    if (!user) {
      throw new HttpException(
        {
          message: 'User not found',
          errors: `User with email ${dataRequest.email} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      dataRequest.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        {
          message: 'Invalid credential',
          errors: 'Email or Password is incorrect',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async create(request: CreateUserRequest): Promise<User> {
    this.logger.info(`Create user request: ${JSON.stringify(request)}`);

    const userRequest = this.validationService.validate(
      UserValidation.CREATE,
      request,
    );

    const isUserExist = await this.findByEmail(userRequest.email);

    if (isUserExist) {
      throw new HttpException(
        {
          message: 'Unique constraint violation',
          errors: `Email ${userRequest.email} already exist`,
        },
        HttpStatus.CONFLICT,
      );
    }

    userRequest.password = await bcrypt.hash(userRequest.password, 10);

    return this.prismaService.user.create({
      data: userRequest,
    });
  }
}
