import { Application } from "express";
import { DefaultMiddleware } from "../middleware/default.middleware";

export default function (app: Application) {
    app.get("/", DefaultMiddleware.healthcheck);
   // app.get("/example", DefaultMiddleware.exampleToDelete);
    
   
   app.get("/getConfirmationNewMembre/", (req, res) => {
       const { firstname, mail } = req.query;
       DefaultMiddleware.sendMailNewMember(firstname as string, mail as string)
           .then(() => res.sendStatus(200))
           .catch(err => res.status(500).send(err.message));
   });
  


    app.get("/getConfirmationCommande/", (req, res) => {
        const { firstname, noCommande, mail } = req.query;
        DefaultMiddleware.sendMailCommande(firstname as string, noCommande as string, mail as string)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err.message));
    });


}
