import { Request, Response } from "express";
import { serverInstance } from "../server";
import { env } from "process";
import { createTransport } from "nodemailer";
import { render } from "@react-email/components";



export class DefaultMiddleware {
    public static healthcheck(req: Request, res: Response) {
        res.status(200).send("OK");
    }



    //Mail envoi pour un nouveau membre
    public static async sendMailNewMember(firstname: String, mail: String) {

        const transport = createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        //apel de l'email concerné
        const email = render(<EmailBienvenue firstname={firstname}/>);

        await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: mail,
            subject: "Bienvenue chez Asso Info Evry",
            html: email
            
        });
    }


     //Mail envoi pour une commande
     public static async sendMailCommande(firstname: String, noCommande : String, mail : String) {

        const transport = createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        //apel de l'email concerné
        const email = render(<EmailCommande firstname={firstname}, noCommande={noCommande} />);

        await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: mail,
            subject: "Ma commande chez Asso Info Evry",
            html: email
            
        });

    }
}




    
