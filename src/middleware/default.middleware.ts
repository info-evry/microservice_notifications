import { Request, Response } from "express";
import { serverInstance } from "../server";

export class DefaultMiddleware {
    public static healthcheck(req: Request, res: Response) {
        res.status(200).send("OK");
    }

    public static async exampleToDelete(req: Request, res: Response) {
        try {
            const users = await serverInstance.getPrismaClient().user.findMany();
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send(`An error occured : ${error}`);
        }
    }

    
    public static async getConfirmationCommande(req: Request, res: Response) {
        try {
            console.log(req.params['id']);
            //récupération du nom grace à l'id
            const name = await serverInstance.getPrismaClient().user.findUnique({
                where: {
                    id: parseInt(req.params['id'])
                }
            });
            res.status(200).send(name);
           

        } catch (error) {
            res.status(500).send(`An error occured : ${error}`);
        }
    }
}
