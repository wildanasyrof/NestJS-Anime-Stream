import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { Logger } from 'winston';
import { GenreValidation } from './genre.validation';
import { CreateGenreRequest, GenreResponse } from 'src/model/genre.model';

@Injectable()
export class GenreService {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(request: CreateGenreRequest): Promise<GenreResponse> {
    this.logger.info(`Create genre ${JSON.stringify(request)}`);
    const createRequest = this.validationService.validate(
      GenreValidation.CREATE,
      request,
    );

    return this.prismaService.genre.create({
      data: createRequest,
    });
  }

  async get(): Promise<GenreResponse[]> {
    this.logger.info(`Get All Genre`);
    return this.prismaService.genre.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async destroy(id: number): Promise<GenreResponse> {
    this.logger.info(`Delete genre ${id}`);
    return this.prismaService.genre.delete({
      where: {
        id,
      },
    });
  }
}
