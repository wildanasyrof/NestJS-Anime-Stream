export class CreateEpisodeRequest {
  title: string;
  episodeNumber: number;
  videoUrl: string;
}

export class EpisodeResponse {
  id: number;
  animeId: number;
  title: string;
  episodeNumber: number;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
