import { Module } from '@nestjs/common';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

@Module({
  providers: [EpisodeService],
  controllers: [EpisodeController],
})
export class EpisodeModule {}
