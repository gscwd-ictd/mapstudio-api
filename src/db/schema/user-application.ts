import { geometry, integer, jsonb, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { applicants } from "./applicants";
import { Conforme, Representative } from "../../utils/types"
import { ownershipType } from "@mapstudio/utils/arrays";


export const ownershipTypeEnum = pgEnum('ownership_type', ownershipType);

export const userApplication = pgTable('user_application', {
    id: uuid('user_application_id').primaryKey().defaultRandom(),
    applicantId: uuid('applicant_id_fk').references(() => applicants.id),
    latlong: geometry('latlong', { type: 'point', mode: 'xy', srid: 4326 }).notNull(),
    conforme: jsonb('conforme').$type<Conforme[]>(),
    representative: jsonb('representatives').$type<Representative>(),
    accountNumber: varchar('account_number'),
    brgy: uuid('brgy').notNull(),
    purok: uuid('purok').notNull(),
    street: text('street'),
    lotNo: varchar('lot_no'),
    noOfPersons: integer('no_of_persons'),
    noOfHousesInLot: integer('no_of_houses_in_lot'),
    ownershipType: ownershipTypeEnum('ownership_type').notNull()
});