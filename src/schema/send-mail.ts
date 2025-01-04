import { z } from "zod";

// Create a schema to filter information when sending an email
export const newMemberMailSchema = z.object({
    firstname: z.string().nonempty(),
    name: z.string().nonempty(),
    mail: z.string().email().nonempty(),
});
export const confirmationCommandMailSchema = z.object({
    firstname: z.string(),
    name: z.string(),
    mail: z.string().email().nonempty(),
    noCommande: z.string(),
});
export type SendMail = z.infer<typeof newMemberMailSchema>;
export type SendMailCommande = z.infer<typeof confirmationCommandMailSchema>;
