import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database/dbConfig.js";

import userFactory from "./factories/userFactory.js";

import dotenv from "dotenv";
dotenv.config();

beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;

});

describe("POST /sign-up, user test suite", () => {
  it("creates an user given valid email and password", async () => {
    const newUser = userFactory.createUserData(10);

    const response = await supertest(app).post("/sign-up").send(newUser);
    
    expect(response.statusCode).toBe(201);
  });

  it("returns 409 for an already registered email", async () => {
    const newUser = userFactory.createUserData(10);

    const response = await supertest(app).post("/sign-up").send(newUser);
    expect(response.statusCode).toBe(201);

    const repeatedEmail = await supertest(app).post("/sign-up").send(newUser);
    console.log("(", repeatedEmail.error["status"],") -", repeatedEmail.error["text"]);
    expect(repeatedEmail.statusCode).toBe(409);
  });

  it("returns 422 for password length < 10", async () => {
    const newUser = userFactory.createUserData(9);

    const response = await supertest(app).post("/sign-up").send(newUser);
    console.log("(", response.error["status"],") -", response.error["text"]);
    expect(response.statusCode).toBe(422);
  });
});

describe("POST /sign-in, user test suite", () => {
  it("returns 401 for incorrect password", async () => {
    const newUser = userFactory.createUserData(10);
    
    await supertest(app).post("/sign-up").send(newUser);
    
    newUser.password = "wrong_password";

    const response = await supertest(app).post("/sign-in").send(newUser);
    expect(response.statusCode).toBe(401);
  });

  it("should receive a token for valid login data", async () => {
    const newUser = userFactory.createUserData(10);

    await supertest(app).post("/sign-up").send(newUser);

    const response = await supertest(app).post("/sign-in").send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.text).not.toBe("");
    console.log(response.text, "<< token");
  });
});


afterAll( async () => {
  await prisma.$disconnect();
});