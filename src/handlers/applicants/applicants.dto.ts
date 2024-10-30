
import { Sex } from "@mapstudio/utils/enums";
import { z } from "zod";

export const addSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    birthdate: z.string(),
    sex: z.enum(Sex),
    deletedAt: z.string().nullable()
})