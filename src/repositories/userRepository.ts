import { prisma } from "../database/dbConfig.js";
import { User } from "@prisma/client";

export type NewUser = Omit<User, "id">;

async function insert(newUser: NewUser) {
  await prisma.user.create({
    data: newUser,
  });
}

async function findByEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });  
}

const userRepository = {
  insert,
  findByEmail,
};

export default userRepository;