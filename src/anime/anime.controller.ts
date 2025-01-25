import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeResponse, CreateAnimeRequest } from 'src/model/anime.model';
import { WebResponse } from 'src/model/web.model';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  async create(
    @Body() request: CreateAnimeRequest,
  ): Promise<WebResponse<AnimeResponse>> {
    const result = await this.animeService.create(request);
    return {
      status: 'success',
      message: 'Anime created successfully',
      data: result,
    };
  }

  @Get()
  async findAll(): Promise<WebResponse<AnimeResponse[]>> {
    const result = await this.animeService.findAll();
    return {
      status: 'success',
      message: 'Anime retrieved successfully',
      data: result,
    };
  }
}
