import { Hono } from "hono";
import { applicantsHandler } from "./handlers/applicants/applicants"
import { userApplicationHandler } from "./handlers/user-application.ts/user-application";
import { applicationDocumentsHandler } from "./handlers/application-documents/application-documents";

const app = new Hono();
app.route('/api', applicantsHandler);
app.route('/api', userApplicationHandler);
app.route('/api', applicationDocumentsHandler);
export default app;