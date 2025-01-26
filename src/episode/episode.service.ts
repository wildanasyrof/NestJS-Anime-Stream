import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { CreateEpisodeRequest, EpisodeResponse } from 'src/model/episode.model';
import { Logger } from 'winston';
import { EpisodeValidation } from './episode.validation';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    animeId: number,
    request: CreateEpisodeRequest,
  ): Promise<EpisodeResponse> {
    this.logger.info(`create episode request: ${JSON.stringify(request)}`);

    const createRequest = this.validationService.validate(
      EpisodeValidation.CREATE,
      request,
    );

    const anime = await this.prismaService.anime.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!anime) {
      throw new HttpException(
        {
          message: 'Anime not found',
          errors: `Anime with ID ${animeId} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prismaService.episode.create({
      data: {
        ...createRequest,
        anime: {
          connect: {
            id: animeId,
          },
        },
      },
    });
  }

  async update(
    animeId: number,
    episodeNumber: number,
    request: CreateEpisodeRequest,
  ): Promise<EpisodeResponse> {
    this.logger.info(`update episode request: ${JSON.stringify(request)}`);

    const updateRequest = this.validationService.validate(
      EpisodeValidation.UPDATE,
      request,
    );

    const anime = await this.prismaService.anime.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!anime) {
      throw new HttpException(
        {
          message: 'Anime not found',
          errors: `Anime with ID ${animeId} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const episode = await this.prismaService.episode.findUnique({
      where: {
        episode_number: episodeNumber,
      },
    });

    if (!episode) {
      throw new HttpException(
        {
          message: 'Episode not found',
          errors: `Anime with ID ${animeId} where episode is ${episodeNumber} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prismaService.episode.update({
      where: {
        episode_number: episodeNumber,
      },
      data: updateRequest,
    });
  }

  async destroy(
    animeId: number,
    episodeNumber: number,
  ): Promise<EpisodeResponse> {
    const anime = await this.prismaService.anime.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!anime) {
      throw new HttpException(
        {
          message: 'Anime not found',
          errors: `Anime with ID ${animeId} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const episode = await this.prismaService.episode.findUnique({
      where: {
        episode_number: episodeNumber,
      },
    });

    if (!episode) {
      throw new HttpException(
        {
          message: 'Episode not found',
          errors: `Anime with ID ${animeId} where episode is ${episodeNumber} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prismaService.episode.delete({
      where: {
        episode_number: episodeNumber,
      },
    });
  }
}
