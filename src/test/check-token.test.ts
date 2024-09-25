import { NextFunction, Request, Response } from "express";
import { UserRole } from "../entity/user";
import { MicrosoftMiddleware } from "../middleware/microsoft.middleware";
import { ApiError } from "../model/api.model";
import { JWTClient } from "../tools/jwt-client";

describe("checkToken middleware", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {},
        } as Request;

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            locals: {},
        } as unknown as Response;

        next = jest.fn();
    });

    it("should return 401 if no token is provided", async () => {
        await MicrosoftMiddleware.checkToken(req, res as any, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith(expect.any(ApiError));
        expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if an invalid token is provided", async () => {
        req.headers.authorization = "Bearer invalid-token";
        const verifyAccessTokenSpy = jest
            .spyOn(JWTClient.prototype, "verifyAccessToken")
            .mockImplementation(() => {
                throw new Error("Invalid token");
            });

        await MicrosoftMiddleware.checkToken(req, res as any, next);

        expect(verifyAccessTokenSpy).toHaveBeenCalledWith("invalid-token");
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith(expect.any(ApiError));
        expect(next).not.toHaveBeenCalled();

        verifyAccessTokenSpy.mockRestore();
    });

    it("should set the user in res.locals and call next if a valid token is provided", async () => {
        req.headers.authorization = "Bearer valid-token";
        const verifyAccessTokenSpy = jest
            .spyOn(JWTClient.prototype, "verifyAccessToken")
            .mockReturnValue({
                id: 1,
                iat: 1,
                exp: 1,
                aud: "test",
                iss: "test",
                user: {
                    id: 1,
                    name: "John Doe",
                    email: "johndoe@essilor.fr",
                    role: UserRole.admin,
                },
            });

        await MicrosoftMiddleware.checkToken(req, res as any, next);

        expect(verifyAccessTokenSpy).toHaveBeenCalledWith("valid-token");
        expect(res.locals.user).toEqual({
            id: 1,
            name: "John Doe",
            email: "johndoe@essilor.fr",
            role: UserRole.admin,
        });
        expect(next).toHaveBeenCalled();

        verifyAccessTokenSpy.mockRestore();
    });
});
