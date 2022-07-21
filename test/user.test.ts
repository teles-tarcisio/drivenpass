import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database/dbConfig.js";

import userFactory from "./factories/userFactory.js";

import dotenv from "dotenv";
dotenv.config();

beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;

});

describe("user test suite", () => {
  it("create a user given email and password", async () => {
    const newUser = userFactory.createUserData();

    const response = await supertest(app).post("/sign-up").send(newUser);
    
    expect(response.statusCode).toBe(201);
  });


});


afterAll( async () => {
  await prisma.$disconnect();
});