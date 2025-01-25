import { z, ZodType } from "zod";

export class GenreValidation {
    static readonly CREATE : ZodType = z.object({
        name: z.string().min(1).max(50)
    });
}