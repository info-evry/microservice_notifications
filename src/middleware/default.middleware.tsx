import React from "react";
import { Request, Response } from "express";
import { createTransport } from "nodemailer";
import { render } from "@react-email/components";
import EmailBienvenue from "../../emails/EmailBienvenue";
import EmailCommande from "../../emails/EmailCommande";
import { ZodError } from "zod";
import { newMemberMailSchema, confirmationCommandMailSchema } from "../schema/send-mail";
export class DefaultMiddleware {
    public static healthcheck(req: Request, res: Response) {
        res.status(200).send("OK");
    }

    //Mail envoi pour un nouveau membre
    public static async sendMailNewMember(req: Request, res: Response) {
        try {
            //Check input
            const body = newMemberMailSchema.parse(await req.body);
            //Define the transport sender informations
            const transport = createTransport({
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            });
            //Get the HTML content of the email
            const email = render(<EmailBienvenue firstname={req.body.firstname} />);
            //Send the email
            await transport
                .sendMail({
                    from: process.env.EMAIL_FROM,
                    to: req.body.mail,
                    subject: "Bienvenue chez Asso Info Evry",
                    html: email,
                })
                .then(() => {
                    res.status(200).send("Mail sent");
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Email not sent",
                        detail: err,
                    });
                });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Zod Error",
                    detail: error.issues.reduce((acc, curr) => acc + curr.message + "\n", ""),
                    more: error.issues.reduce((acc, curr) => acc + curr.path.join("->") + " ", ""),
                });
            }
        }
    }

    //Mail envoi pour une commande
    public static async sendMailCommande(req: Request, res: Response) {
        try {
            //Check input
            const body = confirmationCommandMailSchema.parse(await req.body);
            //Define the transport sender informations
            const transport = createTransport({
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            });
            //Get the HTML content of the email
            const email = render(
                <EmailCommande
                    firstname={req.body.firstname}
                    name={req.body.name}
                    noCommande={req.body.noCommande}
                />,
            );
            //Send the email
            await transport
                .sendMail({
                    from: process.env.EMAIL_FROM,
                    to: req.body.mail,
                    subject: "Ma commande chez Asso Info Evry",
                    html: email,
                })
                .then(() => {
                    res.status(200).send("Mail command sent");
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Email not sent",
                        detail: err,
                    });
                });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Zod Error",
                    detail: error.issues.reduce((acc, curr) => acc + curr.message + "\n", ""),
                    more: error.issues.reduce((acc, curr) => acc + curr.path.join("->") + " ", ""),
                });
            }
        }
    }
}
