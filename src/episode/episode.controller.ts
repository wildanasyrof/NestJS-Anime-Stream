import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeRequest } from 'src/model/episode.model';

@Controller('anime/:animeId/episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  async create(
    @Param('animeId', ParseIntPipe) animeId: number,
    @Body() request: CreateEpisodeRequest,
  ) {
    const result = await this.episodeService.create(animeId, request);
    return {
      status: 'success',
      message: 'Episode created successfully',
      data: result,
    };
  }

  @Patch(':episodeNumber')
  async update(
    @Param('animeId', ParseIntPipe) animeId: number,
    @Param('episodeNumber', ParseIntPipe) episodeNumber: number,
    @Body() request: CreateEpisodeRequest,
  ) {
    const result = await this.episodeService.update(
      animeId,
      episodeNumber,
      request,
    );
    return {
      status: 'success',
      message: 'Episode updated successfully',
      data: result,
    };
  }

  @Delete(':episodeNumber')
  async destroy(
    @Param('animeId', ParseIntPipe) animeId: number,
    @Param('episodeNumber', ParseIntPipe) episodeNumber: number,
  ) {
    const result = await this.episodeService.destroy(animeId, episodeNumber);
    return {
      status: 'success',
      message: 'Episode deleted successfully',
      data: result,
    };
  }
}
