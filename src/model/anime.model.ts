export class CreateAnimeDto {
    title: string;
    description: string;
    episodes: number;
    studio: string;
    rating: number;
    genre: string;
    releaseDate: string;
}

export class AnimeResponse {
    id: number;
    title: string;
    description: string;
    episodes: number;
    studio: string;
    rating: number;
    genre: string;
    releaseDate: string;
}