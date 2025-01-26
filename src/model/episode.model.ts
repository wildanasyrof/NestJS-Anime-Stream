import { AnimeResponse } from './anime.model';

export class CreateEpisodeRequest {
  title: string;
  episode_number: number;
  video_url: string;
}

export class EpisodeResponse {
  id: number;
  anime_id: number;
  title: string;
  episode_number: number;
  video_url: string;
  created_at: Date;
  updated_at: Date;
}
