import { Hono } from "hono";
import { addSchema } from "./user-application.dto";
import { zValidator } from "@hono/zod-validator";
import { db } from "@mapstudio/config/postgres";
import { userApplication } from "@mapstudio/db/schema/user-application";
import { eq } from 'drizzle-orm';

// Refer to previous comments
export const userApplicationHandler = new Hono().basePath('user-application')

    .post(zValidator('json', addSchema), async (c) => {
        const data = c.req.valid('json');
        await db.insert(userApplication).values(data);
        return c.json(data);
    })

    .get('', async (c) => {
        return c.json(await db.select().from(userApplication));
    })

    .get('/:applicantId/', async (c) => {
        const { applicantId } = c.req.param();
        return c.json(await db.select().from(userApplication).where(eq(userApplication.applicantId, applicantId)));
    })