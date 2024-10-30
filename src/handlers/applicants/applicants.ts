import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { addSchema, findByApplicantIdSchema } from "./applicants.dto";
import { applicants } from "@mapstudio/db/schema/applicants";
import { db } from "@mapstudio/config/postgres";
import { sql, eq, ilike } from "drizzle-orm";

/**
 * Things to do:
 * - [Critical] Always enclose throwable functions inside a try-catch block 
 *   to prevent your server from crashing due to uncaught errors. Hint: All database calls are throwable
 * 
 * - [Not Critical] Consider using form instead of json for easier implementation of csrf prevention. 
 *   Only use json when data structure involves more primitive data types other than string (i.e. boolean, number, etc)
 * 
 * - 
 */

export const applicantsHandler = new Hono().basePath('/applicants')
    .post('/', zValidator('json', addSchema), async (c) => {
        const data = c.req.valid('json');
        await db.insert(applicants).values(data);

        /**
         *  Any particular reason why return this data structure?
         *
         * If you insist on implementing this, consider creating a global type for this for re-usability and uniformity across 
         * all endpoints that might need to return the same structure.
         * For example:
         * 
         * export type SuccessMessage = {
         *      success: boolean
         *      message: string
         * }
         *
         * Also, consider this recommendation:
         * 
         * export type SuccessMessage = {
         *      status: number
         *      message: string
         *      data: object
         * }
         * 
         */


         // I'm not comfortable with stringifying the data
         // Also, you appear to be returning the "data" - which is the json object sent by the client via the request body.
         // It is more appropriate to return the inserted applicant instead. Thus, assign a variable to it:

         // const applicant = await db.insert(applicants).values(data).returning(...)
         // return c.json({
         //     success: true,
         //     message: `successfully inserted ${JSON.stringify(applicant)}`
         // })
        return c.json({
            success: true,
            message: `successfully inserted ${JSON.stringify(data)}`,
        })
    })

    .get('', async (c: Context) => {
        // (???) maybe use zValidator -> zValidator("query", YourQuerySchema)
        const name = c.req.query('name') ? c.req.query('name') as string : '';  // const name = c.req.valid("query")

        if (name === null || name === '')
            return c.json(await db.select().from(applicants));

        /**
         * Always assign a variable first when returning, for better readability.
         * 
         * const applicant = await db.select().from(applicants).where(...);
         * 
         * return c.json(applicant);
         */
        return c.json(await db.select().from(applicants).where(ilike(applicants.name, '%' + name + '%')));
    })

    .get('/:id', zValidator('json', findByApplicantIdSchema), async (c) => {
        const { id } = c.req.param();

        // Same comment from above
        return c.json(await db.select().from(applicants).where(eq(applicants.id, id)));
    })





