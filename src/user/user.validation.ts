import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly CREATE: ZodType = z.object({
    username: z.string().max(20).nonempty(),
    email: z.string().email().max(100).nonempty(),
    password: z.string().min(8).nonempty(),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  });
}
