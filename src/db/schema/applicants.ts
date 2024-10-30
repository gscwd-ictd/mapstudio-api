
import { Sex } from "@mapstudio/utils/enums";
import { varchar, pgEnum, text, uuid, date, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const sexEnum = pgEnum('sex', Sex);

export const applicants = pgTable('applicants', {
    id: uuid('applicant_id').primaryKey().defaultRandom(),
    name: text('name'),
    address: text("address").notNull(),
    email: varchar("email", { length: 50 }),
    birthdate: date("birth_date", { mode: "string" }).notNull(),
    sex: sexEnum("sex").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
})