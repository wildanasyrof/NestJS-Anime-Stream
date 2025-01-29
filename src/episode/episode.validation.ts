import { z, ZodType } from 'zod';

export class EpisodeValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().nonempty(),
    episodeNumber: z.number().int(),
    videoUrl: z.string().nonempty(),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().optional(),
    episodeNumber: z.number().int().optional(),
    videoUrl: z.string().nonempty().optional(),
  });
}
