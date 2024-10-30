
import { Sex } from "@mapstudio/utils/enums";
import { z } from "zod";

// Let's set the naming convention for zod schemas as pascal case. Converted to pascal case: FindByApplicantIdSchema
// Also, rename this to make it more descriptive of its purpose.
// When naming VARIABLES, make it sound like "what it is" - ApplicantIdParamSchema, rather than "what it does" - FindByApplicantIdSchema
// Only use verbs (i.e. find, get, etc.) when naming a FUNCTION - findByApplicantId(id: string) or getManagerByHairStyle(style: "longHair" | "kalbo")
export const findByApplicantIdSchema = z.object({
    id: z.string().uuid()
});

// Add what? Rename this
// Apply the conventions mentioned above
export const addSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    address: z.string(),
    email: z.string(),
    birthdate: z.string(),
    sex: z.enum(Sex),
    deletedAt: z.string().nullable()
})