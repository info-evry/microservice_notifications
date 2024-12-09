import React from "react";
import { Request, Response } from "express";
import { createTransport } from "nodemailer";
import { render } from "@react-email/components";
import EmailBienvenue from "../../emails/emailBienvenue";
import EmailCommande from "../../emails/emailCommande";




export class DefaultMiddleware {


    public static healthcheck(req: Request, res: Response) {
        res.status(200).send("OK");
    }

    



    //Mail envoi pour un nouveau membre
    public static async sendMailNewMember(req: Request, res: Response) {
 
        const transport = createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        //apel de l'email concerné
        const email = render(<EmailBienvenue firstname={req.body.firstname} />);
        
        await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: req.body.mail,
            subject: "Bienvenue chez Asso Info Evry",
            html: email
            
        });
    }


     //Mail envoi pour une commande
     public static async sendMailCommande(req : Request, res: Response) {
        console.log(req.body);
        const transport = createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        //apel de l'email concerné
        const email = render(<EmailCommande firstname={req.body.firstname} name={req.body.name} noCommande={req.body.noCommande} />);

        await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: req.body.mail,
            subject: "Ma commande chez Asso Info Evry",
            html: email
            
        });

    }
}




    
