import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
  async findAll(
    @Query('page') page: number = 2,
    @Query('limit') limit: number = 5,
    @Query('genre') genre?: string, // Optional: Filter by genre
  ): Promise<WebResponse<AnimeResponse[]>> {
    const result = await this.animeService.findAll(page, limit, { genre });
    return {
      status: 'success',
      message: 'Anime retrieved successfully',
      data: result.animeData,
      pagination: result.metadata,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<WebResponse<AnimeResponse>> {
    const result = await this.animeService.findById(parseInt(id));
    return {
      status: 'success',
      message: 'Anime retrieved successfully',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: CreateAnimeRequest,
  ): Promise<WebResponse<AnimeResponse>> {
    const result = await this.animeService.update(parseInt(id), request);
    return {
      status: 'success',
      message: 'Anime updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<WebResponse<AnimeResponse>> {
    const result = await this.animeService.destroy(parseInt(id));
    return {
      status: 'success',
      message: 'Anime deleted successfully',
      data: result,
    };
  }
}
