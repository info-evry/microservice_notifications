import { Application } from "express";
import { DefaultMiddleware } from "../middleware/default.middleware";
import { MailMiddleware } from "../middleware/mail.middleware";

export default function (app: Application) {
    app.get("/", DefaultMiddleware.healthcheck);
    app.post("/mailNewMember", MailMiddleware.sendMailNewMember);
    app.post("/mailCommand", MailMiddleware.sendMailCommande);
}
