import { z, ZodType } from 'zod';

export class EpisodeValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().nonempty(),
    episode_number: z.number().int(),
    video_url: z.string().nonempty(),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().optional(),
    episode_number: z.number().int().optional(),
    video_url: z.string().nonempty().optional(),
  });
}
