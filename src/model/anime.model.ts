import { CreateGenreRequest, GenreResponse } from './genre.model';

export class CreateAnimeRequest {
  title: string;
  alt_titles: string | null;
  chapters: string;
  source: string;
  year: string;
  rating: number;
  synopsis: string;
  image_source: string;
  genres: { name: string }[];
}

export class UpdateAnimeRequest {
  title?: string;
  alt_titles?: string | null;
  chapters?: string;
  source?: string;
  year?: string;
  rating?: number;
  synopsis?: string;
  image_source?: string;
  genres?: { name: string }[];
}

export class AnimeResponse {
  id: number;
  title: string;
  alt_titles: string | null;
  chapters: string;
  source: string;
  year: string;
  rating: number;
  synopsis: string;
  image_source: string;
  genres: GenreResponse[];
  created_at: Date;
  updated_at: Date;
}
