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

    const genreIds = await Promise.all(
      genres.map(async (genre) => {
        return this.prismaService.genre.findUnique({
          where: {
            name: genre.name,
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

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: { genre?: string; title?: string },
  ) {
    const offset = (page - 1) * limit;
    const animeData = await this.prismaService.anime.findMany({
      include: { genres: true },
      skip: offset,
      take: limit,
      where: {
        title: { contains: filter?.title },
        genres: filter?.genre ? { some: { name: filter.genre } } : undefined,
      },
    });
    const total = await this.prismaService.anime.count({
      where: {
        title: { contains: filter?.title },
        genres: filter?.genre ? { some: { name: filter.genre } } : undefined,
      },
    });
    return {
      animeData,
      metadata: { total, page, limit },
    };
  }

  async findById(id: number): Promise<AnimeResponse> {
    const anime = await this.prismaService.anime.findUnique({
      where: { id },
      include: {
        genres: true,
        episodes: true,
      },
    });

    if (!anime) {
      throw new HttpException(
        {
          message: 'Anime not found',
          errors: `Anime with ID ${id} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return anime;
  }

  async update(
    id: number,
    request: Partial<CreateAnimeRequest>,
  ): Promise<AnimeResponse> {
    this.logger.info(`Update anime request: ${JSON.stringify(request)}`);

    const anime = await this.prismaService.anime.findUnique({
      where: { id },
      include: { genres: true },
    });

    if (!anime) {
      throw new HttpException(
        {
          message: 'Anime not found',
          errors: `Anime with ID ${id} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const updateRequest = this.validationService.validate(
      AnimeValidation.UPDATE,
      request,
    );

    const { genres, ...animeData } = updateRequest;

    let genreUpdateData = {};
    if (genres) {
      const genreIds = await Promise.all(
        genres.map(async (genre) => {
          const existingGenre = await this.prismaService.genre.findUnique({
            where: {
              name: genre.name,
            },
          });

          if (!existingGenre) {
            throw new HttpException(
              {
                message: 'Genre not found',
                errors: `Genre with name '${genre.name}' does not exist`,
              },
              HttpStatus.BAD_REQUEST,
            );
          }

          return existingGenre;
        }),
      );

      genreUpdateData = {
        genres: {
          set: genreIds.map((genre) => ({ id: genre.id })),
        },
      };
    }

    return this.prismaService.anime.update({
      where: { id },
      data: {
        ...animeData,
        ...genreUpdateData, // Only update genres if provided
      },
      include: { genres: true },
    });
  }

  async destroy(id: number): Promise<AnimeResponse> {
    const anime = await this.prismaService.anime.findUnique({
      where: { id },
      include: { genres: true },
    });

    if (!anime) {
      throw new HttpException(
        {
          message: 'Anime not found',
          errors: `Anime with ID ${id} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prismaService.anime.delete({
      where: { id },
    });

    return anime;
  }
}
