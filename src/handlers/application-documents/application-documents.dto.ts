import { z } from "zod";
// id: uuid('application_documents_id').primaryKey().defaultRandom(),
//     userApplicationId: uuid('user_application_id_fk').references(() => userApplication.id),
//     proofOfOwnership: jsonb('proof_of_ownership').$type<UploadedFile[]>(),
//     proofOfBilling: jsonb('proof_of_billing').$type<UploadedFile[]>(),
//     supportingDocs: jsonb('supporting_docs').$type<UploadedFile[]>(),
//     validId: jsonb('valid_id').$type<UploadedFile[]>(),
//     selfie: jsonb('selfie').$type<UploadedFile>()

export const getByUserApplicationIdSchema = z.object({ userApplicationId: z.string().uuid() });
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
    })
})