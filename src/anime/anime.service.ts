import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validation/validation.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma/prisma.service';
import { AnimeResponse, CreateAnimeRequest } from '../model/anime.model';
import { AnimeValidation } from './anime.validation';

@Injectable()
export class AnimeService {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(request: CreateAnimeRequest): Promise<AnimeResponse> {
    this.logger.info(`Create anime request: ${JSON.stringify(request)}`);

    const createRequest = this.validationService.validate(
      AnimeValidation.CREATE,
      request,
    );

    const { genres, ...animeData } = createRequest;

    // Log genres before attempting to map
    this.logger.info(
      `Genres before mapping: ${JSON.stringify(createRequest.genres)}`,
    );

    const genreIds = await Promise.all(
      genres.map(async (genre) => {
        return this.prismaService.genre.findUnique({
          where: {
            name: genre,
          },
        });
      }),
    );

    return this.prismaService.anime.create({
      data: {
        ...animeData,
        genres: {
          connect: genreIds.map((genre) => ({ id: genre.id })),
        },
      },
      include: { genres: true },
    });
  }

  async findAll(): Promise<AnimeResponse[]> {
    return this.prismaService.anime.findMany({
      include: { genres: true },
    });
  }
}
