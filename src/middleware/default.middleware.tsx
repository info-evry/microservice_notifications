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
}
