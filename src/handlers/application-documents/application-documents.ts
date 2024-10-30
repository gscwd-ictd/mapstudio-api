import { zValidator } from "@hono/zod-validator";
import { db } from "@mapstudio/config/postgres";
import { applicationDocuments } from "@mapstudio/db/schema/application-documents";
import { Hono } from "hono";
import { addSchema, findByUserApplicationIdSchema } from "./application-documents.dto";
import { sql, eq, } from "drizzle-orm";

// Refer to previous comments
export const applicationDocumentsHandler = new Hono().basePath('/application-documents')
    .get(async c => {
        return c.json(await db.select().from(applicationDocuments));
    })

    .post(zValidator('json', addSchema), async (c) => {
        const data = c.req.valid('json');
        await db.insert(applicationDocuments).values(data);
        return c.json(data);
    })

    .get('/:userApplicationId', zValidator('param', findByUserApplicationIdSchema), async (c) => {
        const { userApplicationId } = c.req.param();
        return c.json(await db.select().from(applicationDocuments).where(eq(applicationDocuments.userApplicationId, userApplicationId)));
    });

