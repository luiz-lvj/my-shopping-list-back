import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database";

describe("POST /items", () =>{
    it("returns 201 for valid post", async () =>{
        const body = {
            text: "teste"
        }
        const postText = await supertest(app).post("/items").send(body);
        expect(postText.status).toBe(201);
    });
    it("returns 400 for bad request", async () =>{
        const body = {
            wrong: "aa"
        }
        const postTextWrong = await supertest(app).post("/items").send(body);
        expect(postTextWrong.status).toBe(400);
    });
});

describe("GET /items", () => {
    it("returns 200 for valid get", async () =>{
        const getItems = await supertest(app).get("/items");
        expect(getItems.status).toBe(200);
        expect(getItems.body).toBeInstanceOf(Array)
    });
});

beforeEach(async () =>{
    await connection.query("DELETE FROM items");
});
afterAll(async () =>{
    await connection.query("DELETE FROM items");
    await connection.end();
});

