import { ConformeType, OwnershipType } from "@mapstudio/utils/enums";
import { Placeholder, SQL } from "drizzle-orm";
import { z } from "zod";

export const addSchema = z.object({
    id: z.string().uuid().optional(),
    applicantId: z.string().uuid(),
    latlong: z.union([z.instanceof(SQL), z.object({
        x: z.number(),
        y: z.number()
    }), z.instanceof(Placeholder<string, any>)]),
    conforme: z.array(z.object({
        type: z.enum(ConformeType),
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        extension: z.string(),
    })),
    representative: z.object({
        relationship: z.string(),
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        extension: z.string(),
    }),
    accountNumber: z.string(),
    brgy: z.string().uuid(),
    purok: z.string().uuid(),
    street: z.string(),
    lotNo: z.string(),
    noOfPersons: z.number(),
    noOfHousesInLot: z.number(),
    ownershipType: z.enum(OwnershipType),
    deletedAt: z.string().nullable()
});