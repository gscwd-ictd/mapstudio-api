import { z } from "zod";

export const findByUserApplicationIdSchema = z.object({ userApplicationId: z.string().uuid() });
export const addSchema = z.object({
    id: z.string().uuid().optional(),
    userApplicationId: z.string().uuid(),
    proofOfOwnership: z.array(z.object({
        id: z.string(),
        name: z.string(),
        fileName: z.string(),
        url: z.string()
    })),
    proofOfBilling: z.array(z.object({
        id: z.string(),
        name: z.string(),
        fileName: z.string(),
        url: z.string()
    })),
    supportingDocs: z.array(z.object({
        id: z.string(),
        name: z.string(),
        fileName: z.string(),
        url: z.string()
    })),
    validId: z.array(z.object({
        id: z.string(),
        name: z.string(),
        fileName: z.string(),
        url: z.string()
    })),
    selfie: z.object({
        id: z.string(),
        name: z.string(),
        fileName: z.string(),
        url: z.string()
    }),
    deletedAt: z.string().nullable()
})