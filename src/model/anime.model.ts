import { CreateGenreRequest, GenreResponse } from './genre.model';

export class CreateAnimeRequest {
  title: string;
  altTitles: string | null;
  chapters: string;
  source: string;
  year: string;
  rating: number;
  synopsis: string;
  imageSource: string;
  genres: { name: string }[];
}

export class UpdateAnimeRequest {
  title?: string;
  altTitles?: string | null;
  chapters?: string;
  source?: string;
  year?: string;
  rating?: number;
  synopsis?: string;
  imageSource?: string;
  genres?: { name: string }[];
}

export class AnimeResponse {
  id: number;
  title: string;
  altTitles: string | null;
  chapters: string;
  source: string;
  year: string;
  rating: number;
  synopsis: string;
  imageSource: string;
  genres: GenreResponse[];
  createdAt: Date;
  updatedAt: Date;
}
