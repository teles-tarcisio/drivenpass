import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database/dbConfig.js";
import { NewWifi } from "../src/repositories/wifiNetsRepository.js";

import userFactory from "./factories/userFactory.js";

import dotenv from "dotenv";
dotenv.config();

beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE wifinetworks CASCADE;`;

});

describe("POST /wifinets/new, wifi nets test suite", () => {
  it("correctly saves wifi network data for logged-in user", async () => {
    const newUser = userFactory.createUserData(10);

    await supertest(app).post("/sign-up").send(newUser);
    const loggedUser = await supertest(app).post("/sign-in").send(newUser);
    const token = loggedUser.text;

    const wifiData: NewWifi = {
      tag: "wifitag000",
      ssid: "AstolfoNet",
      password: "wifi000password",
    };

    const response = await supertest(app).post("/wifinets/new").send(wifiData).set("Authorization", `Bearer ${token}`);

    console.log(response.statusCode, response.text);    
    
    
  });

  
});


afterAll( async () => {
  await prisma.$disconnect();
});