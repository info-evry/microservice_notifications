import request from "supertest";
import { serverInstance } from "../server";
import exp from "constants";

const RECEIVER_MAIL = "asso@info-evry.fr";

describe("Mail middleware", () => {
    it("should returns a 200 normal request", async () => {
        const response = await request(serverInstance.getApp()).post("/mailNewMember").send({
            firstname: "test",
            mail: RECEIVER_MAIL,
            name: "test",
        });
        expect(response.status).toBe(200);
        expect(response.text).toContain("Mail sent");
    });
    it("should returns a 400 with Zod Error", async () => {
        const response = await request(serverInstance.getApp()).post("/mailNewMember").send({
            firstname: "test",
            mail: "iamabademail",
            name: "test",
        });
        expect(response.status).toBe(400);
        expect(response.text).toContain("Zod Error");
    });
    it("should returns a 200 normal request", async () => {
        const response = await request(serverInstance.getApp()).post("/mailCommand").send({
            firstname: "test",
            name: "test",
            mail: RECEIVER_MAIL,
            noCommande: "",
        });
        expect(response.status).toBe(200);
        expect(response.text).toContain("Mail command sent");
    });
    it("should returns a 400 with Zod Error", async () => {
        const response = await request(serverInstance.getApp()).post("/mailCommand").send({
            firstname: "test",
            name: "test",
            mail: "",
            noCommande: "",
        });
        expect(response.status).toBe(400);
        expect(response.text).toContain("Zod Error");
    });
});
