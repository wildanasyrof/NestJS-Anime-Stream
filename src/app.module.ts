import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AnimeModule } from './anime/anime.module';
import { GenreModule } from './genre/genre.module';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [CommonModule, AnimeModule, GenreModule, EpisodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
