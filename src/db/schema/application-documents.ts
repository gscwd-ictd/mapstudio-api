import { jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { userApplication } from "./user-application";
import { UploadedFile } from "@mapstudio/utils/types";


export const applicationDocuments = pgTable('application_documents', {
    id: uuid('application_documents_id').primaryKey().defaultRandom(),
    userApplicationId: uuid('user_application_id_fk').references(() => userApplication.id),
    proofOfOwnership: jsonb('proof_of_ownership').$type<UploadedFile[]>(),
    proofOfBilling: jsonb('proof_of_billing').$type<UploadedFile[]>(),
    supportingDocs: jsonb('supporting_docs').$type<UploadedFile[]>(),
    validId: jsonb('valid_id').$type<UploadedFile[]>(),
    selfie: jsonb('selfie').$type<UploadedFile>()
});