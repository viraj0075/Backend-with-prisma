import { z } from "zod";

const addToWatchListSchema = z.object({
    movieId: z.string(),
    status: z.enum(["PLANNED", "WATCHED", "DROPPED"], "Invalid status.").optional(),
    rating: z.coerce.number().int().min(1, "Rating must be between 1 and 10").max(10, "Rating must be between 1 and 10").optional(),
    notes: z.string().optional()
})

export default addToWatchListSchema;