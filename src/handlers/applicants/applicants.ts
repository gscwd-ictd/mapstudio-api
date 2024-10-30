import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { addSchema } from "./applicants.dto";
import { applicants } from "@mapstudio/db/schema/applicants";
import { db } from "@mapstudio/config/postgres";
import { sql, eq } from "drizzle-orm";

export const applicantsHandler = new Hono().basePath('/applicants')
    .post('/', zValidator('json', addSchema), async (c) => {
        const data = c.req.valid('json');
        await db.insert(applicants).values(data);
        return c.json({
            success: true,
            message: `successfully inserted ${JSON.stringify(data)}`,
        })
    })

    .get('', async (c: Context) => {
        return c.json(await db.select().from(applicants));
    })

    .get('/:name', async (c: Context) => {
        const { name } = c.req.param();
        return c.json(await db.select().from(applicants).where(eq(applicants.name, name)));
    })

