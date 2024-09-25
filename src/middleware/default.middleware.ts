import { Request, Response } from "express";

export class DefaultMiddleware {
    public static healthcheck(req: Request, res: Response) {
        res.status(200).send("OK");
    }
}
