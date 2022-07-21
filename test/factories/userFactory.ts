import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/dbConfig.js";
import { NewUser } from "../../src/repositories/userRepository.js";


function createUserData(): NewUser {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(10),
  };
}












const userFactory = {
  createUserData,

};

export default userFactory;