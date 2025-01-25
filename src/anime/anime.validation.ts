import { z, ZodType } from 'zod';

export class AnimeValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(255),
    alt_titles: z.string().nullable(),
    chapters: z.string().min(1).max(255),
    source: z.string().min(1).max(255),
    year: z.string().min(1).max(4),
    rating: z.number().min(0).max(10),
    synopsis: z.string().min(1),
    image_source: z.string(),
    genres: z.array(
      z.object({
        name: z.string().min(1).max(255),
      }),
    ),
  });
}
