import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { addSchema, findByApplicantIdSchema } from "./applicants.dto";
import { applicants } from "@mapstudio/db/schema/applicants";
import { db } from "@mapstudio/config/postgres";
import { sql, eq, ilike } from "drizzle-orm";

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
        const name = c.req.query('name') ? c.req.query('name') as string : '';
        if (name === null || name === '')
            return c.json(await db.select().from(applicants));
        return c.json(await db.select().from(applicants).where(ilike(applicants.name, '%' + name + '%')));
    })

    .get('/:id', zValidator('json', findByApplicantIdSchema), async (c) => {
        const { id } = c.req.param();
        return c.json(await db.select().from(applicants).where(eq(applicants.id, id)));
    })





