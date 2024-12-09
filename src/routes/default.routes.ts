import { Application } from "express";
import { DefaultMiddleware } from "../middleware/default.middleware";

export default function (app: Application) {
    app.get("/", DefaultMiddleware.healthcheck);
   // app.get("/example", DefaultMiddleware.exampleToDelete);
    app.post("/postConfirmationNewMembre", DefaultMiddleware.sendMailNewMember);
    app.post("/postConfirmationCommande", DefaultMiddleware.sendMailCommande);




}
